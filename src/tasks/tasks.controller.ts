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
import { TaskStatus } from 'src/constants';
import { Taskboard } from 'src/taskboards/taskboard.entity';
import { CreateTaskDto, UpdateTaskDto } from './interfaces';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findAllByTaskboard(@Param('id') id: number) {
    const taskboard = new Taskboard();
    taskboard.id = id;

    return this.taskService.findAllByTaskboard(taskboard);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() task: CreateTaskDto) {
    await this.taskService.create({ ...task, status: TaskStatus.IN_PROGRESS });
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async update(@Body() task: UpdateTaskDto) {
    await this.taskService.update(task);
  }

  @UseGuards(JwtAuthGuard)
  @Put('status')
  async updateStatus(@Body() { id, status }: UpdateTaskDto) {
    await this.taskService.updateStatus({ id, status });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.taskService.remove(id);

    return {
      id: Number(id),
    };
  }
}
