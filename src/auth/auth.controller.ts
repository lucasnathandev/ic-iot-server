import { Body, Controller, Post, UseGuards, Ip } from '@nestjs/common';
import { ICredentials } from 'src/shared/infra/interfaces/credentials.interface';
import { AuthService } from './auth.service';
import { ThrottlerBehindProxyGuard } from 'src/shared/infra/guards/ip-control.guard';

@UseGuards(ThrottlerBehindProxyGuard)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Ip() ip: string, @Body() credentials: ICredentials) {
    return this.authService.login(credentials, ip);
  }
}
