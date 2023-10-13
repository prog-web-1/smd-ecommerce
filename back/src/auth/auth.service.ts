import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from './errors/unauthorized.error';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(user: User): Promise<UserToken> {
    const payload: UserPayload = {
      sub: user.id,
      login: user.login,
      nome: user.nome,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(login: string, senha: string): Promise<User> {
    const user = await this.userService.findOneBy({
      where: { login },
      relations: ['compras', 'compras.produtos'],
    });
    if (user) {
      const isPasswordValid = await bcrypt.compare(senha, user.senha);

      if (isPasswordValid) {
        return {
          ...user,
          senha: undefined,
        };
      }
    }

    throw new UnauthorizedError('Login or password provided is incorrect.');
  }
}
