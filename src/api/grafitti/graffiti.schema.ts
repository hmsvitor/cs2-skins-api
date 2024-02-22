import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Crate, Rarity } from 'src/api/skins/skins.schema';

export type GraffitiDocument = HydratedDocument<Graffiti>;

@Schema()
export class Graffiti {
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

export const GraffitiSchema = SchemaFactory.createForClass(Graffiti);

export const GraffitiModel = mongoose.model<GraffitiDocument>(
  'Graffiti',
  GraffitiSchema,
);
