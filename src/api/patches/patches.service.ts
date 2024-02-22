import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patch } from './patches.schema';
import { CreatePatchDto } from './dto/create-patch.dto';
import { MetaData } from '../skins/skins.service';

export type PatchResponse = {
  data: Patch[];
  metadata: MetaData;
};

@Injectable()
export class PatchesService {
  constructor(@InjectModel('Patch') private patchModel: Model<Patch>) {}

  async findAll(
    perPage: number = 10,
    page: number = 1,
  ): Promise<PatchResponse> {
    const totalItems = await this.patchModel.countDocuments().exec();

    const totalPages = Math.ceil(totalItems / perPage);
    const skip = (page - 1) * perPage;

    const patches = await this.patchModel
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

    return { data: patches, metadata };
  }

  async create(createPatchDtos: CreatePatchDto): Promise<Patch> {
    const createdPatch = new this.patchModel(createPatchDtos);
    return createdPatch.save();
  }

  async createMany(createPatchDtos: CreatePatchDto[]): Promise<Patch[]> {
    const createdPatches = await this.patchModel.insertMany(createPatchDtos);
    return createdPatches;
  }

  async findOne(id: string): Promise<Patch> {
    const patch = await this.patchModel.findById(id).exec();
    if (!patch) {
      throw new NotFoundException(`Patch with ID ${id} not found`);
    }
    return patch;
  }

  async deleteMany(): Promise<void> {
    await this.patchModel.deleteMany({}).exec();
  }
}
