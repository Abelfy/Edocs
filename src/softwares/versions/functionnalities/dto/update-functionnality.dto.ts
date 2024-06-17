import { PartialType } from '@nestjs/mapped-types';
import { CreateFunctionnalityDto } from './create-functionnality.dto';

export class UpdateFunctionnalityDto extends PartialType(CreateFunctionnalityDto) {}
