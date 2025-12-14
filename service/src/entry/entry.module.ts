import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entry } from 'src/entities/entry';
import { EntryController } from './entry.controller';
import { EntryService } from './entry.service';

@Module({
  imports: [TypeOrmModule.forFeature([Entry])],
  providers: [
    EntryService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
  ],
  controllers: [EntryController],
})
export class EntryModule {}
