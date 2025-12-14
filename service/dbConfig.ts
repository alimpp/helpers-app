import { Entry } from 'src/entities/entry';
import { File } from 'src/entities/fileEntity';
import { UserEntity } from 'src/entities/user.entity';

import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const pgConfig: PostgresConnectionOptions = {
  url: 'postgresql://neondb_owner:npg_7UCSN9HfFmau@ep-lively-butterfly-ah5bop1e-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  type: 'postgres',
  port: 3306,
  entities: [UserEntity, File, Entry],

  // ** synchronize in development mode should be true and in production mode should be false ** //
  synchronize: true,
};
