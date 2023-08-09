import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import createUserEntity from './entities/create-user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { encodePassword } from '../auth/bcrypt/bcrypt';
import { UpdateUserEntity } from './entities/update-user.entity';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdatepasswordEntity } from './entities/update-password.entity';
import { BanUserDto } from './dto/ban-user.dto';
import { BanUserEntity } from './entities/ban-user.entity';

@ApiTags('Users')
@Controller('Users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('adduser')
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: createUserEntity,
  })
  createuser(@Body() createUserDto: CreateUserDto) {
    if (createUserDto.age == 0) {
      throw new BadRequestException('Amout not 0');
    }
    const password = encodePassword(createUserDto.password);
    const newUser = { ...createUserDto, password };
    return this.usersService.createuser(newUser);
  }

  @Get('allusers')
  @ApiBearerAuth('defaultBearerAuth')
  @UseGuards(JwtAuthGuard)
  findalluser() {
    return this.usersService.findalluser();
  }

  @Get('newuser')
  @ApiBearerAuth('defaultBearerAuth')
  @UseGuards(JwtAuthGuard)
  findnewuser() {
    return this.usersService.findnewuser();
  }

  @Get('oneuser/:name')
  @ApiBearerAuth('defaultBearerAuth')
  @UseGuards(JwtAuthGuard)
  findoneuser(@Param('name') name: string) {
    return this.usersService.findoneuser(name);
  }

  @Put('banuserby/:id')
  @ApiBearerAuth('defaultBearerAuth')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: BanUserEntity,
  })
  banuser(@Param('id') id: string, @Body() banUserDto: BanUserDto) {
    return this.usersService.banuser(id, banUserDto);
  }

  @Put('edituserby/:id')
  @ApiBearerAuth('defaultBearerAuth')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: UpdateUserEntity,
  })
  updateuser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const password = encodePassword(updateUserDto.password);
    const updateUser = { ...updateUserDto, password };
    return this.usersService.updateuser(id, updateUser);
  }

  @Put('editpasswordby/:id')
  @ApiBearerAuth('defaultBearerAuth')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: UpdatepasswordEntity,
  })
  updatepassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const password = encodePassword(updatePasswordDto.password);
    const updatePassword = { ...updatePasswordDto, password };
    return this.usersService.updatepassword(id, updatePassword);
  }

  @Delete(':id')
  @ApiBearerAuth('defaultBearerAuth')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.usersService.removeuser(id);
  }

}
