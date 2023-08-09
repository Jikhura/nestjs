import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class LoginUserDto {
  id: string;

  @ApiPropertyOptional({
    type: String,
    example: '',
  })
  @IsOptional()
  @IsString()
  username: string;

  @ApiPropertyOptional({
    type: String,
    example: '',
  })
  @IsOptional()
  @IsString()
  password: string;
}
