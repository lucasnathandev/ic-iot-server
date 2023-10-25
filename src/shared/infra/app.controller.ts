import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ICredentials } from './interfaces/credentials.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/auth')
  login(@Body() credentials: ICredentials) {
    this.appService.authenticateUser(credentials);
  }
}
