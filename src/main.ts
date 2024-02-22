import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('CS2 Skin API')
    .setDescription('Get skins, agents, crates and more from CS2.')
    .setVersion('1.0')
    .addTag('skins')
    .addTag('agents')
    .addTag('crates')
    .addTag('keys')
    .addTag('musicKits')
    .addTag('collectibles')
    .addTag('collections')
    .addTag('graffiti')
    .addTag('patches')
    .addTag('stickers')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
