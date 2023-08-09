import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { UsersService } from '../users/users.service';
import { Cache } from 'cache-manager';
import { compearPassword } from './bcrypt/bcrypt';
import validateUserEntity from './entity/validate-user.entity';

@Injectable()
export class AuthService {
  @Inject(CACHE_MANAGER) private cacheManager: Cache;
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findonegetuser(username);
    const value = Number(
      await this.cacheManager.get(`${user.username}-auth-fail`),
    );
    if (user['active'] !== 'true') {
      throw new BadRequestException('You are banned');
    }
    if (user && user.active === 'true' && value <= 2) {
      const matchedUser = compearPassword(password, user.password);
      if (matchedUser) {
        this.cacheManager.del(`${user.username}-auth-fail`);
        return user;
      } else {
        if (!value) {
          await this.cacheManager.set(`${user.username}-auth-fail`, 1, 120);
        } else {
          await this.cacheManager.set(`${user.username}-auth-fail`, value + 1, 10);
        }
        return null;
      }
    }
  }

  async login(user: validateUserEntity) {
    const payload = {
      username: user.username,
      sub: JSON.stringify(user._id),
      type: user.type,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
