import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class BanUserEntity {
  @ApiPropertyOptional({
    type: String,
    example: 'false',
  })
  @IsOptional()
  @IsString()
  active: string;
}
