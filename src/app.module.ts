import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware, logger } from 'common/middlewares/logger.middleware';
import { AppConfigModule } from './config/app/configuration.module';
import { OpenAPIConfigModule } from './config/openapi/configuration.module';
import { HealthModule } from './models/health/health.module';
import { UsersController } from './models/users/users.controller';
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, logger)
      .exclude({ path: 'users', method: RequestMethod.GET })
      .forRoutes(UsersController);
  }
}
