import { IotBoxModule } from 'src/iot-box/infra/iot-box.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from 'src/customer/infra/customer.module';
import { AdminModule } from '../../admin/infra/admin.module';
import { AuthModule } from 'src/auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { LoggerModule } from 'nestjs-pino';
import pino from 'pino';
import envConfig from './env.config';
@Module({
  imports: [
    // LoggerModule.forRoot({
    //   pinoHttp: {
    //     name: 'Pino',
    //     level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
    //     // stream: pino.destination({
    //     //   dest: 'logs/pino-logs',
    //     //   minLength: 4096,
    //     //   sync: false,
    //     // }),
    //   },
    // }),
    ThrottlerModule.forRoot([
      {
        ttl: 10000,
        limit: 100,
      },
    ]),
    ConfigModule.forRoot({ isGlobal: true, load: [envConfig] }),
    IotBoxModule,
    CustomerModule,
    AdminModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
