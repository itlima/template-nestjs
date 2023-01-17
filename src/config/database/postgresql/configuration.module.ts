import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { PostgresqlConfigService } from './configuration.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        POSTGRESQL_HOST: Joi.string().default('localhost'),
        POSTGRESQL_PORT: Joi.number().default(5432),
        POSTGRESQL_USERNAME: Joi.string(),
        POSTGRESQL_PASSWORD: Joi.string(),
        POSTGRESQL_DATABASE: Joi.string(),
      }),
    }),
  ],
  providers: [ConfigService, PostgresqlConfigService],
  exports: [ConfigService, PostgresqlConfigService],
})
export class PostgresqlConfigModule {}
