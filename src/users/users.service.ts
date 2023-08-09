import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Users, UsersDocument } from '../users/schema/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUsercoinDto } from '../order/dto/update-usercoin.dto';
import { UpdateUserEntity } from './entities/update-user.entity';
import { BanUserEntity } from './entities/ban-user.entity';
import { BanUserDto } from './dto/ban-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdatepasswordEntity } from './entities/update-password.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
  ) {}

  async createuser(createUserDto: CreateUserDto): Promise<Users> {
    return this.usersModel.create(createUserDto);
  }

  async findalluser(): Promise<Users> {
    return this.usersModel.find().lean();
  }

  async findoneuser(name: string) {
    return this.usersModel
      .findOne({
        $or: [{ username: name }, { fristname: name }, { lastname: name }],
      })
      .lean();
  }
  //pagination findoneusertest
  async findoneusertest() {
    return this.usersModel
      .findOne({
        $or: [{ username: name }, { fristname: name }, { lastname: name }],
      })
      .lean();
  }

  async findnewuser() {
    const start = new Date().setHours(0, 0, 0, 0);
    const end = new Date().setHours(23, 59, 59, 999);
    return this.usersModel
      .find({
        createdAt: {
          $gte: start,
          $lte: end,
        },
      })
      .lean();
  }

  async updateuser(id: string, updateUserDto: UpdateUserDto): Promise<Users> {
    return this.usersModel
      .updateOne({ _id: new Types.ObjectId(id) }, { $set: updateUserDto })
      .lean();
  }

  async updatepassword(
    id: string,
    UpdatpasswordDto: UpdatePasswordDto,
  ): Promise<Users> {
    return this.usersModel
      .updateOne({ _id: new Types.ObjectId(id) }, { $set: UpdatpasswordDto })
      .lean();
  }

  async banuser(id: string, banUserDto: BanUserDto): Promise<BanUserEntity> {
    return this.usersModel
      .updateOne({ _id: new Types.ObjectId(id) }, { $set: banUserDto })
      .lean();
  }

  async updateusercoin(
    id: string,
    updateUsercoinDto: UpdateUsercoinDto,
  ): Promise<UpdateUserEntity> {
    return this.usersModel
      .updateOne({ _id: new Types.ObjectId(id) }, { $set: updateUsercoinDto })
      .lean();
  }

  async removeuser(id: string) {
    return this.usersModel.deleteOne({ _id: new Types.ObjectId(id) }).lean();
  }

  async findonegetuser(username: string) {
    return this.usersModel.findOne({ username });
  }
}
