import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put, BadRequestException, Req } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import CreateBooksEntity from './entities/create-books.entity';
import UpdateBooksEntity from './entities/update-books.entity';

@ApiTags('Books')
@Controller('Books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post('addbook')
  @ApiBearerAuth('defaultBearerAuth')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: CreateBooksEntity
  })
  create(@Req() req: string, @Body() createBookDto: CreateBookDto) {
    if ( req['user']['type'] !== "admin") {
      throw new BadRequestException('You are not ADMIN')
    }
    if ( createBookDto.price == 0) {
      throw new BadRequestException('Price not 0')
    }
    //แปลงวันที่ จาก xxxx-xx-xx เป็น ISODATE
    const adddate = new Date(createBookDto.adddate);
    const newbook = { ...createBookDto, adddate };
    return this.booksService.create(newbook);
  }

  @Get('getallbook')
  @ApiBearerAuth('defaultBearerAuth')
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.booksService.findallbooks();
  }

  @Get('getonebookby:id')
  @ApiBearerAuth('defaultBearerAuth')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.booksService.findonebookbyid(id);
  }

  // แสดงข้อมูลตามหมวดหมู่
  @Get('getgroupbookby:booktype')
  @ApiBearerAuth('defaultBearerAuth')
  @UseGuards(JwtAuthGuard)
  findgroupbook(@Param('booktype') booktype : string) {
    return this.booksService.findgroupbook(booktype);
  }

  @Put('editbookby:id')
  @ApiBearerAuth('defaultBearerAuth')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: UpdateBooksEntity
  })
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.updateonebook(id, updateBookDto);
  }

  @Delete('deletebookby:id')
  @ApiBearerAuth('defaultBearerAuth')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.booksService.removebook(id);
  }
}
