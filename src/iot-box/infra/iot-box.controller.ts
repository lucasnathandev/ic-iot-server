import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateIotBoxDto } from './dto/create-iot-box.dto';
import { IotBoxService } from './iot-box.service';
import { UpdateIotBoxDto } from './dto/update-iot-box.dto';

@Controller('iot-box')
export class IotBoxController {
  constructor(private readonly iotBoxService: IotBoxService) {}

  @Get(':id')
  async getIotBox(@Param('id') id: string) {
    return await this.iotBoxService.findOne(id);
  }

  @Get()
  async getAllActiveIotBox() {
    return await this.iotBoxService.findAll();
  }

  @Get('report/:id')
  async getFilteredBoxDataReport(
    @Param('id') id: string,
    @Query() query: Partial<{ startDate: Date; endDate: Date }>,
  ) {
    return await this.iotBoxService.getFilteredBoxDataReport(id, query);
  }

  @Post('create')
  async createIotBox(@Body() iotBox: CreateIotBoxDto) {
    await this.iotBoxService.create(iotBox);
  }

  @Patch('update/:id')
  async updateIotBox(@Param('id') id: string, @Body() iotBox: UpdateIotBoxDto) {
    await this.iotBoxService.update(id, iotBox);
  }

  @Delete('delete/:id')
  async inactivateIotBox(@Param('id') id: string) {
    await this.iotBoxService.inactivate(id);
  }
}
