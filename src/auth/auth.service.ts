import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(username);

    const matchPasswords = await bcrypt.compare(pass, user.password);

    if (user && matchPasswords) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
