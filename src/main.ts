import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app/configuration.service';
import { OpenAPIConfigService } from './config/openapi/configuration.service';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfig: AppConfigService = app.get(AppConfigService);
  const openAPI: OpenAPIConfigService = app.get(OpenAPIConfigService);

  app.setGlobalPrefix(appConfig.prefix);

  const document = SwaggerModule.createDocument(app, openAPI.config);
  SwaggerModule.setup(openAPI.prefix, app, document);

  await app.listen(appConfig.port);
}
bootstrap();
