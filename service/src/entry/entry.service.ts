import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Entry } from 'src/entities/entry';
import { Repository } from 'typeorm';

import { AddDto } from './dto/add';
import { UpdateDto } from './dto/update';

@Injectable()
export class EntryService {
  constructor(
    @InjectRepository(Entry)
    private readonly repo: Repository<Entry>,
  ) {}

  list(submiterId: string): Promise<Entry[]> {
    return this.repo.find({ where: { submiter: submiterId } });
  }

  findById(id: string): Promise<Entry | null> {
    return this.repo.findOne({ where: { id } });
  }

  async add(dto: AddDto): Promise<Entry> {
    const entry = this.repo.create(dto);
    return this.repo.save(entry);
  }

  async update(id: string, dto: UpdateDto): Promise<Entry> {
    const entry = await this.repo.preload({
      id,
      ...dto,
    });

    if (!entry) {
      throw new NotFoundException('Record not found');
    }

    return this.repo.save(entry);
  }
}
