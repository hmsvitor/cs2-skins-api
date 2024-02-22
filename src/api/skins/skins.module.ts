import { Module } from '@nestjs/common';
import { SkinsController } from './skins.controller';
import { SkinsService } from './skins.service';
import { Skin, SkinDocument, SkinSchema } from './skins.schema';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Skin', schema: SkinSchema }])],
  controllers: [SkinsController],
  providers: [SkinsService],
})
export class SkinsModule {}
