import { SkinModel } from '../api/skins/skins.schema';
import { AgentModel } from '../api/agents/agents.schema';
import { CollectibleModel } from '../api/collectibles/collectibles.schema';
import { CollectionModel } from '../api/collections/collections.schema';
import { CrateModel } from '../api/crates/crates.schema';
import { GraffitiModel } from '../api/grafitti/graffiti.schema';
import { KeyModel } from '../api/keys/keys.schema';
import { MusicKitModel } from '../api/musicKits/musicKits.schema';
import { PatchModel } from '../api/patches/patches.schema';
import { StickerModel } from '../api/stickers/stickers.schema';
import mongoose from 'mongoose';
import fs from 'fs';

mongoose.connect('mongodb://localhost/nest');

const skinsData = JSON.parse(fs.readFileSync('src/data/skins.json', 'utf-8'));
const agentsData = JSON.parse(fs.readFileSync('src/data/agents.json', 'utf-8'));
const collectiblesData = JSON.parse(
  fs.readFileSync('src/data/collectibles.json', 'utf-8'),
);
const collectionsData = JSON.parse(
  fs.readFileSync('src/data/collections.json', 'utf-8'),
);
const cratesData = JSON.parse(fs.readFileSync('src/data/crates.json', 'utf-8'));
const graffitiData = JSON.parse(
  fs.readFileSync('src/data/graffiti.json', 'utf-8'),
);
const keysData = JSON.parse(fs.readFileSync('src/data/keys.json', 'utf-8'));
const MusicKitsData = JSON.parse(
  fs.readFileSync('src/data/music_kits.json', 'utf-8'),
);
const PatchesData = JSON.parse(
  fs.readFileSync('src/data/patches.json', 'utf-8'),
);
const StickersData = JSON.parse(
  fs.readFileSync('src/data/stickers.json', 'utf-8'),
);

async function seed() {
  try {
    // seeding SKINS ------
    await SkinModel.deleteMany({});
    await SkinModel.insertMany(skinsData);
    console.log('Seed skins completed successfully');

    // seed AGENTS -----
    await AgentModel.deleteMany({});
    await AgentModel.insertMany(agentsData);
    console.log('Seed agents completed successfully');

    // seed COLLECTIBLES -----
    await CollectibleModel.deleteMany({});
    await CollectibleModel.insertMany(collectiblesData);
    console.log('Seed collectibles completed successfully');

    // seed COLLECTIIONS -----
    await CollectionModel.deleteMany({});
    await CollectionModel.insertMany(collectionsData);
    console.log('Seed collections completed successfully');

    // seed CRATES -----
    await CrateModel.deleteMany({});
    await CrateModel.insertMany(cratesData);
    console.log('Seed crates completed successfully');

    // seed GRAFFITI -----
    await GraffitiModel.deleteMany({});
    await GraffitiModel.insertMany(graffitiData);
    console.log('Seed graffiti completed successfully');

    // seed KEYS -----
    await KeyModel.deleteMany({});
    await KeyModel.insertMany(keysData);
    console.log('Seed keys completed successfully');

    // seed MUSIC KITS -----
    await MusicKitModel.deleteMany({});
    await MusicKitModel.insertMany(MusicKitsData);
    console.log('Seed music kits completed successfully');

    // seed PATCHES -----
    await PatchModel.deleteMany({});
    await PatchModel.insertMany(PatchesData);
    console.log('Seed patches completed successfully');

    // seed STICKERS -----
    await StickerModel.deleteMany({});
    await StickerModel.insertMany(StickersData);
    console.log('Seed stickers completed successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    // Disconnect from MongoDB
    mongoose.disconnect();
  }
}

// Run the seed function
seed();
