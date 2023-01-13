import { DatabaseType } from 'typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlConfigModule } from '../../../config/database/mysql/configuration.module';
import { MysqlConfigService } from '../../../config/database/mysql/configuration.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [MysqlConfigModule],
      useFactory: (mysqlConfigService: MysqlConfigService) => ({
        type: 'mysql' as DatabaseType,
        host: mysqlConfigService.host,
        port: mysqlConfigService.port,
        username: mysqlConfigService.username,
        password: mysqlConfigService.password,
        database: mysqlConfigService.database,
        autoLoadEntities: true,
      }),
      inject: [MysqlConfigService],
    } as TypeOrmModule),
  ],
})
export class MysqlDatabaseProviderModule {}
