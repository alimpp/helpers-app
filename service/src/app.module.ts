import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { pgConfig } from 'dbConfig';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [UsersModule, AuthModule, FileModule, TypeOrmModule.forRoot(pgConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
