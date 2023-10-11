import { Controller, Get } from '@nestjs/common';
import { UsersService } from 'src/services/users.service';

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getHello(): string {
    return "eae"
  }
}