import { Module } from '@nestjs/common';
import { StickersController } from './stickers.controller';
import { StickersService } from './stickers.service';
import { StickerSchema } from './stickers.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Sticker', schema: StickerSchema }]),
  ],
  controllers: [StickersController],
  providers: [StickersService],
})
export class StickersModule {}
