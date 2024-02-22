import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Crate, Rarity } from 'src/api/skins/skins.schema';

export type StickerDocument = HydratedDocument<Sticker>;

@Schema()
export class Sticker {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  description: string | null;

  @Prop()
  rarity: Rarity;

  @Prop()
  crates: Crate[];

  @Prop()
  image: string;
}

export const StickerSchema = SchemaFactory.createForClass(Sticker);

export const StickerModel = mongoose.model<StickerDocument>(
  'Sticker',
  StickerSchema,
);
