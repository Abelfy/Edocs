import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JiraService } from './jira.service';
import { CreateJiraDto } from './dto/create-jira.dto';
import { UpdateJiraDto } from './dto/update-jira.dto';

@Controller('jira')
export class JiraController {
  constructor(private readonly jiraService: JiraService) {}

  @Get()
  findAll() {
    return this.jiraService.importFromJira();
  }
}
