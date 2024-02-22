import { Module } from '@nestjs/common';
import { PatchesController } from './patches.controller';
import { PatchesService } from './patches.service';
import { PatchSchema } from './patches.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Patch', schema: PatchSchema }]),
  ],
  controllers: [PatchesController],
  providers: [PatchesService],
})
export class PatchesModule {}
