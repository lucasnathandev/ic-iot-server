import { IotBoxModule } from 'src/iot-box/infraestructure/iot-box.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from 'src/customer/infraestructure/customer.module';
import { AdminModule } from '../../admin/infraestructure/admin.module';
import { AdminService } from 'src/admin/infraestructure/admin.service';
import { CustomerService } from 'src/customer/infraestructure/customer.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [IotBoxModule, CustomerModule, ConfigModule.forRoot(), AdminModule],
  controllers: [AppController],
  providers: [AppService, AdminService, CustomerService, JwtService],
})
export class AppModule {}
