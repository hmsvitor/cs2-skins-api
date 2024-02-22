import { Module } from '@nestjs/common';
import { KeysController } from './keys.controller';
import { KeysService } from './keys.service';
import { KeySchema } from './keys.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Key', schema: KeySchema }])],
  controllers: [KeysController],
  providers: [KeysService],
})
export class KeysModule {}
