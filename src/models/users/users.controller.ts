import { Get, Controller, Post, Body } from '@nestjs/common';
import { ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: [User],
  })
  async listUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CreateUserDto,
  })
  async createUser(@Body() body: CreateUserDto): Promise<CreateUserDto> {
    return this.usersService.create(body);
  }
}
