import { Controller, Get, Logger, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from './current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Response } from 'express';
import JwtAuthGuard from './guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  logger : Logger = new Logger('AuthController');
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@CurrentUser() user: User, @Res({ passthrough: true }) response: Response) {
    await this.authService.login(user, response);
    delete user.password;
    response.send(user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  isAuthenticated() {
    this.logger.verbose('User is authenticated');
    return true;
  }




}
