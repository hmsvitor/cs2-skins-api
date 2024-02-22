import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Contain, ContainRare } from 'src/api/collectibles/collectibles.schema';

export type CrateDocument = HydratedDocument<Crate>;

@Schema()
export class Crate {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  description: string | null;

  @Prop()
  type: string;

  @Prop()
  first_sale_date: string | null;

  @Prop()
  contains: Contain[];

  @Prop()
  contains_rare: ContainRare[];

  @Prop()
  image: string;
}

export const CrateSchema = SchemaFactory.createForClass(Crate);

export const CrateModel = mongoose.model<CrateDocument>('Crate', CrateSchema);
