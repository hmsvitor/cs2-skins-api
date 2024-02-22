import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Collection, Rarity, Team } from '../skins/skins.schema';

export type AgentDocument = HydratedDocument<Agent>;

@Schema()
export class Agent {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  description: string | null;

  @Prop()
  rarity: Rarity;

  @Prop()
  collections: Collection[];

  @Prop()
  team: Team;

  @Prop()
  image: string;
}
export const AgentSchema = SchemaFactory.createForClass(Agent);

export const AgentModel = mongoose.model<AgentDocument>('Agent', AgentSchema);
