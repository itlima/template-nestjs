import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Email used for loggin in application',
    default: 'default@default.com',
  })
  email: string;

  @ApiPropertyOptional()
  name: null | string;

  @ApiProperty()
  password: string;
}
