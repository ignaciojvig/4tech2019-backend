import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ExceptionHandlerFilter } from './filters/exception-handler.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new ExceptionHandlerFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const options = new DocumentBuilder()
    .setTitle('4Tech Backend')
    .setDescription('4Tech Backend API description')
    .setVersion('1.0')
    .addTag('API Doc do nosso Backend')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
