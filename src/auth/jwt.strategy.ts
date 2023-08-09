import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import validatepayloadUserEntity from './entity/validatepayload-user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
    });
    // console.log(process.env.SECRET_KEY);
  }

  async validate(payload: validatepayloadUserEntity) {
    return { _id: payload.sub, username: payload.username, type: payload.type };
  }
}
