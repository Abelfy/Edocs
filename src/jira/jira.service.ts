import { Injectable, Logger, LoggerService } from '@nestjs/common';
import { CreateJiraDto } from './dto/create-jira.dto';
import { UpdateJiraDto } from './dto/update-jira.dto';
import { Version3Client } from 'jira.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Version } from 'src/softwares/versions/entities/version.entity';
import { Equal, Repository, Transaction } from 'typeorm';
import { Software } from 'src/softwares/entities/software.entity';
import { Functionnality } from 'src/softwares/versions/functionnalities/entities/functionnality.entity';
import { ConfigService } from '@nestjs/config';
import { Item } from 'src/softwares/versions/items/entities/item.entity';
import { Unit } from 'src/softwares/versions/items/units/entities/unit.entity';

@Injectable()
export class JiraService {
  private readonly logger = new Logger(JiraService.name);
  jiraClient: Version3Client;

  constructor(
    @InjectRepository(Version) private versionRepository: Repository<Version>,
    @InjectRepository(Software) private softwareRepository: Repository<Software>,
    @InjectRepository(Functionnality) private functionnalitiesRepository: Repository<Functionnality>,
    @InjectRepository(Item) private itemsRepository: Repository<Item>,
    @InjectRepository(Unit) private unitsRepository: Repository<Unit>,
    private readonly configService: ConfigService,
  ) {
    this.jiraClient = new Version3Client({
      host: configService.getOrThrow('JIRA_HOST'),
      authentication : {
        basic: {
          email: configService.getOrThrow('JIRA_ACCOUNT_EMAIL'),
          apiToken: configService.getOrThrow('JIRA_API_TOKEN'),
        },
      }
    })
  }

  /**
   *
   *
   * @return {*} 
   * @memberof JiraService
   */
  async importFromJira() {    
    try {
      const projets = await this.jiraClient.projects.searchProjects({});
      const softwares = [];
      let issues = [];
      for (const projet of projets.values) {
        const projetDetails = await this.jiraClient.projects.getProject({ projectIdOrKey: projet.id });
        let software = await this.softwareRepository.findOne({ where: { jiraID: +projetDetails.id } });
        if(!software){
          software = await this.softwareRepository.save({jiraID: +projetDetails.id,name: projetDetails.name});
        }
        const versions = await this.createVersions(projet, projetDetails.versions);
        for (const version of projetDetails.versions) {
          await this.createFunctionalitiesFromEpics(projet, version);
          await this.createItems(projet, version);
        }
        softwares.push(await this.softwareRepository.save({...software,jiraID: +projetDetails.id,name: projetDetails.name, versions}));
      }
      return softwares;
    } catch (error) {
      this.logger.error(error);
      throw error
    } 

  }

  private validateVersionName(version) {
    const regex = new RegExp('^([0-9]|[1-9][0-9]*)\\.([0-9]|[1-9][0-9]*)\\.([0-9]|[1-9][0-9]*)(?:-([0-9A-Za-z-]+(?:\\.[0-9A-Za-z-]+)*))?(?:\\+[0-9A-Za-z-]+)?$');
    if (!regex.test(version.name)) {
      throw new Error('Invalid version name: ' + version.name);
    }
  }

  private  createVersions(projet, versions) {
    const versionsToCreate = [];
    for (const version of versions) {
      this.validateVersionName(version);
      const [major, minor, patch] = version.name.split('.').map(Number);
      const existingVersion = this.versionRepository.findOne({where: {jiraID: version.id}});
      if(!existingVersion){
        versionsToCreate.push({
          jiraID: version.id,
          major, minor, patch,
          description: 'Version ' + version.name,
        });
      }
    }

    return this.versionRepository.save(versionsToCreate);
  }
  private async createFunctionalitiesFromEpics(projet, version) {
    const epics = (await this.jiraClient.issueSearch.searchForIssuesUsingJql({
      jql: `project = '${projet.key}' AND type = 'Epic'`,
      fields: []
    })).issues;

    const functionalitiesToCreate = [];
    for (const epic of epics) {
      if(!epic.fields.description) throw new Error('Epic description is missing');

      const existingFunctionnality = await this.functionnalitiesRepository.findOne({where: {jiraID: +epic.id}});
      if(!existingFunctionnality){
        functionalitiesToCreate.push({
          jiraID: +epic.id,
          description: JSON.stringify(epic.fields.description),
          label : epic.fields.summary,
          version: await this.versionRepository.findOne({where: {id : version.id}})
        });
      }
    }
    return await this.functionnalitiesRepository.save(functionalitiesToCreate);
  }

  private async createItems(projet, version) {
    const issues = (await this.jiraClient.issueSearch.searchForIssuesUsingJql({
      jql: `project = '${projet.key}' AND fixVersion = '${version.name}' AND type = 'Story'`,
      fields: []
    })).issues;
    for (const issue of issues) {
      if(!issue.fields.description) throw new Error('Issue description is missing');
      const existingItems = await this.itemsRepository.findOne({where: {jiraID: +issue.id}});
      if(!existingItems){
        await this.itemsRepository.save({
          jiraID: +issue.id,
          label: issue.fields.summary,
          description : JSON.stringify(issue.fields.description),
          units: issue.fields.subtasks.map(subtask => {
            return {
              label: subtask.fields.summary,
              description: JSON.stringify(subtask.fields.description),
              jiraID: +subtask.id,
            }
          })
        });
      }
    }
    return issues;
  }
}
