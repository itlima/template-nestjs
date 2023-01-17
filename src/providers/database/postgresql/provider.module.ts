import { DatabaseType } from 'typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresqlConfigModule } from '../../../config/database/postgresql//configuration.module';
import { PostgresqlConfigService } from '../../../config/database/postgresql/configuration.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [PostgresqlConfigModule],
      useFactory: (postgresqlConfigService: PostgresqlConfigService) => ({
        type: 'postgres' as DatabaseType,
        host: postgresqlConfigService.host,
        port: postgresqlConfigService.port,
        username: postgresqlConfigService.username,
        password: postgresqlConfigService.password,
        database: postgresqlConfigService.database,
        autoLoadEntities: true,
      }),
      inject: [PostgresqlConfigService],
    } as TypeOrmModule),
  ],
})
export class PostgresqlDatabaseProviderModule {}
