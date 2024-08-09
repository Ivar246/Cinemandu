import { IsIn, IsString } from 'class-validator';

export class EntityTypeDto {
    @IsString()
    @IsIn(['movie', 'artist'])
    entity: string;
}