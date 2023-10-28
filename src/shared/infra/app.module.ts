import { IotBoxModule } from 'src/iot-box/infraestructure/iot-box.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from 'src/customer/infraestructure/customer.module';
import { AdminModule } from '../../admin/infraestructure/admin.module';
import { AuthModule } from 'src/auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import envConfig from './env.config';
@Module({
  imports: [
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
