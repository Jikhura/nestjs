import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @ApiPropertyOptional({
    type: String,
    example: '',
  })
  @IsString()
  password: string;
}
