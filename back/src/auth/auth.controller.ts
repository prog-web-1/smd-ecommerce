import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  Body,
  Get,
  UseInterceptors,
   ClassSerializerInterceptor
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { IsPublic } from './decorators/is-public.decorator';
import { PublicAuthGuard } from './guards/public-auth-guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req: AuthRequest) {
    const {user} = req
    const token = await this.authService.login(user);
    return { ...user, ...token };
  }

  @IsPublic()
  @UseGuards(PublicAuthGuard)
  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    const token = await this.authService.login(user);
    return { ...user, ...token, senha: undefined };
  }

  @Get('/me')
  async getMe(@CurrentUser() currentUser: User) {
    return await this.userService.findOne(currentUser.id);
  }

}