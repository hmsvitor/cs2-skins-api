import { Module } from '@nestjs/common';
import { MusicKitsController } from './musicKits.controller';
import { MusicKitsService } from './musicKits.service';
import { MusicKitSchema } from './musicKits.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'MusicKit', schema: MusicKitSchema }]),
  ],
  controllers: [MusicKitsController],
  providers: [MusicKitsService],
})
export class MusicKitsModule {}
