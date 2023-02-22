import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { OpenAPIConfigService } from './configuration.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        OPENAPI_PREFIX: Joi.string().default('/docs'),
        OPENAPI_DESCRIPTION: Joi.string(),
        OPENAPI_NAME: Joi.string(),
      }),
    }),
  ],
  providers: [ConfigService, OpenAPIConfigService],
  exports: [ConfigService, OpenAPIConfigService],
})
export class OpenAPIConfigModule {}
