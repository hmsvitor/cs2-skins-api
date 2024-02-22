import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Rarity, Collection, Team } from 'src/api/skins/skins.schema';

export class CreateAgentDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly rarity: Rarity;

  @IsString()
  @IsNotEmpty()
  readonly collections: Collection[];

  @IsString()
  @IsNotEmpty()
  readonly team: Team;

  @IsString()
  @IsNotEmpty()
  readonly image: string;
}
