import { Module } from '@nestjs/common';
import { GraffitiController } from './graffiti.controller';
import { GraffitiService } from './graffiti.service';
import { GraffitiSchema } from './graffiti.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Graffiti', schema: GraffitiSchema }]),
  ],
  controllers: [GraffitiController],
  providers: [GraffitiService],
})
export class GraffitiModule {}
