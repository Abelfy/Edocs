import { PartialType } from '@nestjs/swagger';
import { CreateJiraDto } from './create-jira.dto';

export class UpdateJiraDto extends PartialType(CreateJiraDto) {}
