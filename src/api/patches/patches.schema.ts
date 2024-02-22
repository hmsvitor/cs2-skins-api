import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Rarity } from 'src/api/skins/skins.schema';

export type PatchDocument = HydratedDocument<Patch>;

@Schema()
export class Patch {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  description: string | null;

  @Prop()
  rarity: Rarity;

  @Prop()
  image: string;
}

export const PatchSchema = SchemaFactory.createForClass(Patch);

export const PatchModel = mongoose.model<PatchDocument>('Patch', PatchSchema);
