import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const swaggerConfig = new DocumentBuilder()
        .setTitle('Backpacking Trip Planner Tool')
        .setDescription('API documentation in how to interact with this tool.')
        .setVersion('1.0')
        .addTag('Endpoints')
        .addApiKey({
            type: 'apiKey',
            name: 'authentication',
            in: 'header',
        }, 'authentication')
        .build();
    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, swaggerDocument);

    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
}
bootstrap();
