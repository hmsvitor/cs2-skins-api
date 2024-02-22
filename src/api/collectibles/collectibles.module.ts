import { Module } from '@nestjs/common';
import { CollectiblesController } from './collectibles.controller';
import { CollectiblesService } from './collectibles.service';
import { CollectibleSchema } from './collectibles.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Collectible', schema: CollectibleSchema },
    ]),
  ],
  controllers: [CollectiblesController],
  providers: [CollectiblesService],
})
export class CollectiblesModule {}
