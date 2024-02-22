import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SkinsModule } from 'src/api/skins/skins.module';
import { CollectionsModule } from './api/collections/collections.module';
import { AgentsModule } from './api/agents/agents.module';
import { CollectiblesModule } from './api/collectibles/collectibles.module';
import { CratesModule } from './api/crates/crates.module';
import { GraffitiModule } from './api/grafitti/graffiti.module';
import { KeysModule } from './api/keys/keys.module';
import { MusicKitsModule } from './api/musicKits/musicKits.module';
import { PatchesModule } from './api/patches/patches.module';
import { StickersModule } from './api/stickers/stickers.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    SkinsModule,
    AgentsModule,
    CollectiblesModule,
    CollectionsModule,
    CratesModule,
    GraffitiModule,
    KeysModule,
    MusicKitsModule,
    PatchesModule,
    StickersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
