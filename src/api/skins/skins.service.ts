import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Skin } from './skins.schema';
import { CreateSkinDto } from './dto/create-skin.dto';

export type SkinResponse = {
  data: Skin[];
  metadata: MetaData;
};

export type MetaData = {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
};

@Injectable()
export class SkinsService {
  constructor(@InjectModel('Skin') private skinModel: Model<Skin>) {}

  async findAll(filters?: any): Promise<SkinResponse> {
    const totalItems = await this.skinModel.countDocuments().exec();
    let { perPage = 10, page = 1 }: { perPage: number; page: number } =
      filters || {};

    let query = this.skinModel.find();

    if (filters) {
      if (filters.weapon) {
        query = query.where('weapon.id').equals(filters.weapon);
      }
      if (filters.name) {
        query = query.where('name').equals(filters.name);
      }
      if (filters.category) {
        query = query.where('category.id').equals(filters.category);
      }
      if (filters.pattern) {
        query = query.where('pattern.id').equals(filters.pattern);
      }
      if (filters.stattrak !== undefined) {
        query = query.where('stattrak').equals(filters.stattrak);
      }
      if (filters.souvenir !== undefined) {
        query = query.where('souvenir').equals(filters.souvenir);
      }
      if (filters.wears && filters.wears.length > 0) {
        query = query.where('wears.id').in(filters.wears);
      }
      if (filters.collections && filters.collections.length > 0) {
        query = query.where('collections.id').in(filters.collections);
      }
      if (filters.crates && filters.crates.length > 0) {
        query = query.where('crates.id').in(filters.crates);
      }
      if (filters.team) {
        query = query.where('team.id').equals(filters.team);
      }
    }

    // Calculate pagination values
    const totalPages = Math.ceil(totalItems / perPage);
    const skip = (page - 1) * perPage;

    query = query.skip(skip).limit(perPage);

    const skins: Skin[] = await query.exec();

    const metadata = {
      page: Number(page),
      perPage: Number(perPage),
      totalItems,
      totalPages,
    };

    return { data: skins, metadata };
  }

  async getUniqueWeapons(): Promise<any[]> {
    const distinctWeapons = await this.skinModel.distinct('weapon').exec();
    return distinctWeapons.filter(
      (weapon) => weapon && weapon.id && weapon.name,
    );
  }

  async getUniqueCategories(): Promise<any[]> {
    const distinctCategories = await this.skinModel.distinct('category').exec();
    return distinctCategories.filter(
      (category) => category && category.id && category.name,
    );
  }

  async getUniquePatterns(): Promise<any[]> {
    const distinctPatterns = await this.skinModel.distinct('pattern').exec();
    return distinctPatterns.filter(
      (pattern) => pattern && pattern.id && pattern.name,
    );
  }

  async getUniqueWears(): Promise<any[]> {
    const distinctWears = await this.skinModel.distinct('wears').exec();
    return distinctWears.filter((wear) => wear && wear.id && wear.name);
  }

  async getUniqueCollections(): Promise<any[]> {
    const distinctCollections = await this.skinModel
      .distinct('collections')
      .exec();
    return distinctCollections.filter(
      (collection) => collection && collection.id && collection.name,
    );
  }

  async getUniqueCrates(): Promise<any[]> {
    const distinctCrates = await this.skinModel.distinct('crates').exec();
    return distinctCrates.filter((crate) => crate && crate.id && crate.name);
  }

  async getUniqueTeams(): Promise<any[]> {
    const distinctTeams = await this.skinModel.distinct('team').exec();
    return distinctTeams.filter((team) => team && team.id && team.name);
  }

  async create(createSkinDto: CreateSkinDto): Promise<Skin> {
    const createdSkin = new this.skinModel(createSkinDto);
    return createdSkin.save();
  }

  async createMany(createSkinDtos: CreateSkinDto[]): Promise<Skin[]> {
    const createdSkins = await this.skinModel.insertMany(createSkinDtos);
    return createdSkins;
  }

  async findOne(id: string): Promise<Skin> {
    const skin = await this.skinModel.findById(id).exec();
    if (!skin) {
      throw new NotFoundException(`Skin with ID ${id} not found`);
    }
    return skin;
  }

  async deleteMany(): Promise<void> {
    await this.skinModel.deleteMany({}).exec();
  }
}
