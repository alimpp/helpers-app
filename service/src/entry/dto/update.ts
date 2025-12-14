import { PartialType } from '@nestjs/mapped-types';
import { AddDto } from './add';

export class UpdateDto extends PartialType(AddDto) {}
