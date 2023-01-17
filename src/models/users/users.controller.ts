import {
  Get,
  Body,
  Controller,
  UseInterceptors,
  SerializeOptions,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import {
  UserEntity,
  extendedUserGroupsForSerializing,
} from './serializers/user.serializer';
import { UsersService } from './users.service';

@Controller('users')
@SerializeOptions({
  groups: extendedUserGroupsForSerializing,
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() inputs): Promise<UserEntity> {
    return await this.usersService.findOne(inputs);
  }
}
