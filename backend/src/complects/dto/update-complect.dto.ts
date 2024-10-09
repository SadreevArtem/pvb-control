import { PartialType } from '@nestjs/mapped-types';
import { CreateComplectDto } from './create-complect.dto';

export class UpdateComplectDto extends PartialType(CreateComplectDto) {}
