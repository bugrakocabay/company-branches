import { Body, Controller, Get, Param, Post, Session } from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/user-login.dto';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';

@Controller('api/auth')
@Serialize(UserDto)
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  signup(@Body() dto: CreateUserDto) {
    return this.userService.create(
      dto.email,
      dto.password,
      dto.first_name,
      dto.last_name,
      dto.role,
    );
  }

  @Post('signin')
  async signin(@Body() dto: LoginUserDto, @Session() session: any) {
    const user = await this.userService.signin(dto.email, dto.password);
    session.userId = user.id;

    return user;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(parseInt(id));
  }

  @Get()
  find() {
    return this.userService.findAll();
  }
}
