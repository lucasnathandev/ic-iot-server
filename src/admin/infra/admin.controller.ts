import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Logger,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  private readonly logger: Logger = new Logger(AdminController.name);

  @Post('create')
  create(@Body() createAdminDto: CreateAdminDto) {
    this.logger.log('Creating admin');
    return this.adminService.create(createAdminDto);
  }

  @Get()
  async findAll(@Query('email') email?: string, @Query('cpf') cpf?: string) {
    if (email) return this.adminService.searchAdmin({ email });
    if (cpf) return this.adminService.searchAdmin({ cpf });
    const adminList = await this.adminService.findAllActive();
    const allAdminData = adminList.map((admin) => admin.getAdminData());
    return allAdminData;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const admin = await this.adminService.findOne(id);
    const adminData = admin.getAdminData();
    return adminData;
  }

  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return await this.adminService.update(id, updateAdminDto);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return await this.adminService.delete(id);
  }
}
