import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sticker } from './stickers.schema';
import { CreateStickerDto } from './dto/create-sticker.dto';
import { MetaData } from '../skins/skins.service';

export type StickerResponse = {
  data: Sticker[];
  metadata: MetaData;
};

@Injectable()
export class StickersService {
  constructor(@InjectModel('Sticker') private stickerModel: Model<Sticker>) {}

  async findAll(
    perPage: number = 10,
    page: number = 1,
  ): Promise<StickerResponse> {
    const totalItems = await this.stickerModel.countDocuments().exec();

    const totalPages = Math.ceil(totalItems / perPage);
    const skip = (page - 1) * perPage;

    const stickers = await this.stickerModel
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

    return { data: stickers, metadata };
  }

  async create(createStickerDtos: CreateStickerDto): Promise<Sticker> {
    const createdSticker = new this.stickerModel(createStickerDtos);
    return createdSticker.save();
  }

  async createMany(createStickerDtos: CreateStickerDto[]): Promise<Sticker[]> {
    const createdStickers =
      await this.stickerModel.insertMany(createStickerDtos);
    return createdStickers;
  }

  async findOne(id: string): Promise<Sticker> {
    const sticker = await this.stickerModel.findById(id).exec();
    if (!sticker) {
      throw new NotFoundException(`Sticker with ID ${id} not found`);
    }
    return sticker;
  }

  async deleteMany(): Promise<void> {
    await this.stickerModel.deleteMany({}).exec();
  }
}
