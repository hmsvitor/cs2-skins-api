import { Module } from '@nestjs/common';
import { CratesController } from './crates.controller';
import { CratesService } from './crates.service';
import { CrateSchema } from './crates.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Crate', schema: CrateSchema }]),
  ],
  controllers: [CratesController],
  providers: [CratesService],
})
export class CratesModule {}
