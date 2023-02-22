import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

const postgresqlDataSource = new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRESQL_HOST'),
  port: configService.get('POSTGRESQL_PORT'),
  username: configService.get('POSTGRESQL_USERNAME'),
  password: configService.get('POSTGRESQL_PASSWORD'),
  database: configService.get('POSTGRESQL_DATABASE'),
  entities: ['./src/models/**/*.entity.ts'],
  migrations: ['./src/database/migrations/*.ts'],
  migrationsTableName: 'template_migrations',
  logging: true,
});

export default postgresqlDataSource;

postgresqlDataSource
  .initialize()
  .then(() => console.log('Data Source has been initialized'))
  .catch((error) => console.error('Error initializing Data Source', error));
