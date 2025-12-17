import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { EntryService } from './entry.service';

import { AddDto } from './dto/add';
import { UpdateDto } from './dto/update';

@UseGuards(JwtAuthGuard)
@Controller('entry')
export class EntryController {
  constructor(private readonly entryService: EntryService) {}

  @Get('list')
  async list(@Req() req) {
    try {
      return await this.entryService.list(req.user.id);
    } catch (error) {
      throw new BadRequestException('Failed to fetch entries');
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const entry = await this.entryService.findById(id);

    if (!entry) {
      throw new NotFoundException('Entry not found');
    }

    return entry;
  }

  @Post('add')
  async add(@Body() body: AddDto) {
    try {
      return await this.entryService.add(body);
    } catch (error) {
      throw new BadRequestException('Failed to create entry');
    }
  }

  @Patch('update')
  async update(@Req() req, @Body() body: UpdateDto) {
    try {
      return await this.entryService.update(req.user.id, body);
    } catch (error) {
      throw new BadRequestException('Failed to update entry');
    }
  }
}
