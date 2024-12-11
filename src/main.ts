import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(cookieParser());

  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd)
    app.enableCors({
      origin: ['http://localhost:3000', 'http://localhost:5173'],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });

  // Настройка Swagger
  const config = new DocumentBuilder()
    .setTitle('Marketplace API')
    .setDescription('API documentation for the Marketplace application')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('products')
    .addTag('cart')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your Bearer token in the format **Bearer <token>**',
      },
      'Authorization', // This is the name of the security scheme
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8888);
}
bootstrap();
