import {
  Get,
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'common/exceptions/filters/http-exception.filter';
import { CreateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@UseFilters(new HttpExceptionFilter())
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: [User],
  })
  async listUsers(): Promise<User[]> {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
      },
      HttpStatus.FORBIDDEN,
    );
    try {
      return this.usersService.findAll();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This is a custom message',
        },
        HttpStatus.FORBIDDEN,
        { cause: error },
      );
    }
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
