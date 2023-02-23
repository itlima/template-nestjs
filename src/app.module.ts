import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigModule } from './config/app/configuration.module';
import { OpenAPIConfigModule } from './config/openapi/configuration.module';
import { HealthModule } from './models/health/health.module';
import { UsersModule } from './models/users/users.module';
import { PostgresqlDatabaseProviderModule } from './providers/database/postgresql//provider.module';
@Module({
  imports: [
    AppConfigModule,
    OpenAPIConfigModule,
    PostgresqlDatabaseProviderModule,
    UsersModule,
    ConfigModule.forRoot(),
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
