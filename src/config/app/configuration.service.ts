import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get prefix(): string {
    return this.configService.get<string>('app.prefix');
  }
  get port(): number {
    return Number(this.configService.get<number>('app.port'));
  }
}
