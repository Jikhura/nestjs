import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export default class CreateUserEntity {
  @ApiProperty({
    type: String,
    example: '',
  })
  @IsString()
  username: string;

  @ApiProperty({
    type: String,
    example: '',
  })
  @IsString()
  password: string;

  @ApiPropertyOptional({
    type: String,
    example: '',
  })
  @IsString()
  firstname: string;

  @ApiPropertyOptional({
    type: String,
    example: '',
  })
  @IsString()
  lastname: string;

  @ApiPropertyOptional({
    type: Number,
  })
  @IsNumber()
  age: number;

  @ApiPropertyOptional({
    type: Number,
  })
  @IsNumber()
  coin: number;

  @ApiPropertyOptional({
    type: String,
    example: '',
  })
  @IsString()
  type: string;
}
