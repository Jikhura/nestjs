import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BooksDocument = Book & Document;

@Schema()
export class Book {
  @Prop()
  title: string;

  @Prop()
  author: string;

  @Prop()
  price: number;

  @Prop({ default: 10 })
  quantity: number;
}

export const BooksSchema = SchemaFactory.createForClass(Book);
