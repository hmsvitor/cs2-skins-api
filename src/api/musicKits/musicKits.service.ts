import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MusicKit } from './musicKits.schema';
import { CreateMusicKitDto } from './dto/create-musicKits.dto';
import { MetaData } from '../skins/skins.service';

export type MusicKitResponse = {
  data: MusicKit[];
  metadata: MetaData;
};

@Injectable()
export class MusicKitsService {
  constructor(
    @InjectModel('MusicKit') private musicKitModel: Model<MusicKit>,
  ) {}

  async findAll(
    perPage: number = 10,
    page: number = 1,
  ): Promise<MusicKitResponse> {
    const totalItems = await this.musicKitModel.countDocuments().exec();

    const totalPages = Math.ceil(totalItems / perPage);
    const skip = (page - 1) * perPage;

    const musicKits = await this.musicKitModel
      .find()
      .skip(skip)
      .limit(perPage)
      .exec();

    const metadata = {
      page: Number(page),
      perPage: Number(perPage),
      totalItems,
      totalPages,
    };

    return { data: musicKits, metadata };
  }

  async create(createMusicKitDtos: CreateMusicKitDto): Promise<MusicKit> {
    const createdMusicKit = new this.musicKitModel(createMusicKitDtos);
    return createdMusicKit.save();
  }

  async createMany(
    createMusicKitDtos: CreateMusicKitDto[],
  ): Promise<MusicKit[]> {
    const createdMusicKits =
      await this.musicKitModel.insertMany(createMusicKitDtos);
    return createdMusicKits;
  }

  async findOne(id: string): Promise<MusicKit> {
    const musicKit = await this.musicKitModel.findById(id).exec();
    if (!musicKit) {
      throw new NotFoundException(`MusicKit with ID ${id} not found`);
    }
    return musicKit;
  }

  async deleteMany(): Promise<void> {
    await this.musicKitModel.deleteMany({}).exec();
  }
}
