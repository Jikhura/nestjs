import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdatepasswordEntity {
  @ApiPropertyOptional({
    type: String,
    example: '',
  })
  @IsString()
  password: string;
}
