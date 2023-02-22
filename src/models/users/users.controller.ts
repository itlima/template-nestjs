import { Get, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  async listUsers() {
    return await this.usersService.findAll();
  }
  @Post('/')
  async createUser(body) {
    return this.usersService.create(body);
  }
}
