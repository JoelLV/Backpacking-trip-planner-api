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
        .addTag(
            'Equipment Items',
            'Use these endpoints to modify the equipment items inside an equipment set. Make sure that the combination of equipment set id and gear item id are unique.',
        )
        .addTag(
            'Equipment Sets',
            'Use these endpoints to create, modify, or delete an entire equipment set.',
        )
        .addTag(
            'Gear Items',
            'Use these endpoints to create, modify, or delete gear items.',
        )
        .addTag(
            'Lodgings',
            'Use these endpoints to create, modify, or delete lodging options.',
        )
        .addTag(
            'Trails',
            'Use these endpoints to create, modify, or delete trails stored in the database.',
        )
        .addTag(
            'Transportations',
            'Use these endpoints to create, modify, or delete transportation options.',
        )
        .addTag('Trips', 'Use these endpoints to plan your next trip.')
        .addTag(
            'Users',
            'Use these endpoints to create, modify, or delete users that have access to this tool.',
        )
        .addApiKey(
            {
                type: 'apiKey',
                name: 'authentication',
                in: 'header',
            },
            'authentication',
        )
        .build();
    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, swaggerDocument);

    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
}
bootstrap();
