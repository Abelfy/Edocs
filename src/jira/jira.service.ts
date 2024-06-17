import { Injectable, Logger, LoggerService } from '@nestjs/common';
import { CreateJiraDto } from './dto/create-jira.dto';
import { UpdateJiraDto } from './dto/update-jira.dto';
import { Version3Client } from 'jira.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Version } from 'src/softwares/versions/entities/version.entity';
import { Repository, Transaction } from 'typeorm';
import { Software } from 'src/softwares/entities/software.entity';
import { Functionnality } from 'src/softwares/versions/functionnalities/entities/functionnality.entity';

@Injectable()
export class JiraService {
  private readonly logger = new Logger(JiraService.name);
  jiraClient: Version3Client;

  constructor(
    @InjectRepository(Version) private versionRepository: Repository<Version>,
    @InjectRepository(Software) private softwareRepository: Repository<Software>,
    @InjectRepository(Functionnality) private functionnalitiesRepository: Repository<Functionnality>,
  ) {
    this.jiraClient = new Version3Client({
      host: 'https://kuriann.atlassian.net',
      authentication: {
        basic: {
          email: 'adrien.belfy@gmail.com',
          apiToken: 'ATATT3xFfGF0d0xS9Rj9F2mjqQITtmEL0qYnoUMZjXDyDAkS1a7OaKm1r3yRLV1Z2GDmbVcAjeAn9Jqi7-9-1UQ3lfjw9by1ts8vR0o9vSk6fcYJS1XQPTCpLrbw6Yh2k7LV3F2VCw1ZpLgC9hwTd5fOy9HarpWpaIpTlGA2RL7tQwqc0pHiG8A=BC807C3F',
        },
      }
    })
  }

  create(createJiraDto: CreateJiraDto) {
    return 'This action adds a new jira';
  }
  /**
   *
   *
   * @return {*} 
   * @memberof JiraService
  /**
   *
   *
   * @return {*} 
   * @memberof JiraService
  /**
   *
   *
   * @return {*} 
   * @memberof JiraService
   */
  
  async findAll() {    
    try {
      const projets = await this.jiraClient.projects.searchProjects({});
      const softwares = [];
      let issues = [];
      for (const projet of projets.values) {
        const projetDetails = await this.jiraClient.projects.getProject({ projectIdOrKey: projet.id });
        const versions = [];
        for (const version of projetDetails.versions) {

          const regex = new RegExp('^([0-9]|[1-9][0-9]*)\\.([0-9]|[1-9][0-9]*)\\.([0-9]|[1-9][0-9]*)(?:-([0-9A-Za-z-]+(?:\\.[0-9A-Za-z-]+)*))?(?:\\+[0-9A-Za-z-]+)?$');
          if (!regex.test(version.name)) {
            throw new Error('Invalid version name: ' + version.name);
          }

          const [major, minor, patch] = version.name.split('.').map(Number);


          const functionalities = await this.createFunctionalitiesFromEpics(projet, version);
          this.logger.debug(JSON.stringify(functionalities))

          issues = (await this.jiraClient.issueSearch.searchForIssuesUsingJql({
            jql: `project = '${projet.key}' AND fixVersion = '${version.name}'`,
            fields: []
          })).issues;

          versions.push({
            jiraID: version.id,
            major, minor, patch,
            description: 'Version ' + version.name,
            functionnalities: functionalities,
            items: issues.map(issue => {
              return {
                description: issue.fields.summary,

              }
            })
          });

        }
        const software = await this.softwareRepository.save({ name: projet.name,jiraID: +projet.id, versions });
        softwares.push(software);
      }
      return { softwares, issues };
    } catch (error) {
      this.logger.error(error);
      throw error
    }

  }

  private async createFunctionalitiesFromEpics(projet, version) {
    const epics = (await this.jiraClient.issueSearch.searchForIssuesUsingJql({
      jql: `project = '${projet.key}' AND type = 'Epic'`,
      fields: []
    })).issues;

    const functionalitiesToCreate = [];
    for (const epic of epics) {
      if(!epic.fields.description) throw new Error('Epic description is missing');
      functionalitiesToCreate.push({
        description: epic.fields.description,
        label : epic.fields.summary,
      });
    }
    return await this.functionnalitiesRepository.save(functionalitiesToCreate);
  }

  findOne(id: number) {
    return `This action returns a #${id} jira`;
  }

  update(id: number, updateJiraDto: UpdateJiraDto) {
    return `This action updates a #${id} jira`;
  }

  remove(id: number) {
    return `This action removes a #${id} jira`;
  }
}
