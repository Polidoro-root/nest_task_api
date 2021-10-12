import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(username);

    const matchPasswords = await bcrypt.compare(pass, user.password);

    if (user && matchPasswords) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async getIdByToken(token: string): Promise<number> {
    const decoded = this.jwtService.verify(token, {
      secret: jwtConstants.secret,
    });

    console.log({ decoded });

    return 1;
  }
}
