import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PostgresqlConfigService {
  constructor(private configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>('postgresql.host');
  }
  get port(): number {
    return Number(this.configService.get<number>('postgresql.port'));
  }
  get username(): string {
    return this.configService.get<string>('postgresql.username');
  }
  get password(): string {
    return this.configService.get<string>('postgresql.password');
  }
  get database(): string {
    return this.configService.get<string>('postgresql.database');
  }
}
