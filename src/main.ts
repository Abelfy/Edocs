import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Edocs');
  const config = new DocumentBuilder()
    .setTitle('E-Docs example')
    .setDescription('The document builder API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000,()=>  logger.log(`Server is running on http://localhost:3000`));
}
bootstrap();
