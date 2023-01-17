import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigModule } from './config/app/configuration.module';
import { UsersModule } from './models/users/users.module';
import { PostgresqlDatabaseProviderModule } from './providers/database/postgresql//provider.module';
@Module({
  imports: [
    AppConfigModule,
    UsersModule,
    PostgresqlDatabaseProviderModule,
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
