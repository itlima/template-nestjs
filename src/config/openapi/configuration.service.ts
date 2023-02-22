import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder } from '@nestjs/swagger';

@Injectable()
export class OpenAPIConfigService {
  constructor(private configService: ConfigService) {}

  get prefix(): string {
    const openapiPrefix = this.configService.get<string>('openapi.prefix');
    const appPrefix = this.configService.get<string>('app.prefix');
    const prefix = appPrefix + openapiPrefix;
    console.log(prefix)
    return prefix;
  }

  get name(): string {
    return this.configService.get<string>('openapi.name');
  }

  get description(): string {
    return this.configService.get<string>('openapi.description');
  }

  get config() {
    return new DocumentBuilder()
      .setTitle(this.name)
      .setDescription(this.description)
      .build();
  }
}
