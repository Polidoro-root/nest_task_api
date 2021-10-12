import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateTaskboardDto, UpdateTaskboardDto } from './interfaces';
import { TaskboardsService } from './taskboards.service';

@Controller('taskboards')
export class TaskboardsController {
  constructor(private taskboardService: TaskboardsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    return this.taskboardService.findAll(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() taskboard: CreateTaskboardDto) {
    return this.taskboardService.create(taskboard, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async update(@Request() req, @Body() taskboard: UpdateTaskboardDto) {
    await this.taskboardService.update(taskboard);

    return taskboard;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.taskboardService.remove(id);

    return { id: Number(id) };
  }
}
