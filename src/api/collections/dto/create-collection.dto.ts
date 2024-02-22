import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCollectionDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly image: string;
}
