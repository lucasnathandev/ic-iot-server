import { IotBoxModule } from 'src/iot-box/infraestructure/iot-box.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from 'src/customer/infraestructure/customer.module';

@Module({
  imports: [IotBoxModule, ConfigModule.forRoot(), CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
