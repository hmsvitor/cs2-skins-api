import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Rarity } from 'src/api/skins/skins.schema';

export class CreateCollectibleDto {
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
  readonly team: string | null;

  @IsString()
  @IsNotEmpty()
  readonly image: string;
}
