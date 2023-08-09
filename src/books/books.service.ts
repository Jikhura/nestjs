import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Book, BooksDocument } from './schema/books.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { UpdateBooksamountDto } from './dto/update-bookmount.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private booksModel: Model<BooksDocument>,
  ) {}
  async create(createBooksDto: CreateBookDto): Promise<Book> {
    const createdBooks = await this.booksModel.create(createBooksDto);
    return createdBooks;
  }

  async findallbooks() {
    return this.booksModel.find().sort({ amount: 1, price: 1 }).lean();
  }

  async findonebookbyid(id: string) {
    return this.booksModel.findOne({ id: id }).lean();
  }

  //แสดงเป็นกลุ่ม
  async findgroupbook(booktype: string) {
    return this.booksModel
      .find({ booktype: booktype })
      .sort({ price: 1, amount: 1 })
      .lean();
  }

  async updateonebook(id: string, updateBookDto: UpdateBookDto) {
    return this.booksModel.updateOne(
      { _id: new Types.ObjectId(id) },
      { $set: updateBookDto },
    );
  }

  async updatebooksamount(
    id: string,
    updateBooksamountDto: UpdateBooksamountDto,
  ) {
    return this.booksModel.updateOne(
      { _id: new Types.ObjectId(id) },
      { $set: updateBooksamountDto },
    );
  }

  async removebook(id: string) {
    return this.booksModel.deleteOne({ _id: new Types.ObjectId(id) });
  }

  async findonebookbyname(name: string) {
    return this.booksModel.find({ bookname: name }).lean();
  }

  async formatDate(date) {
    let datenow = new Date(date),
      month = '' + (datenow.getMonth() + 1),
      day = '' + datenow.getDate(),
      year = datenow.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
}
