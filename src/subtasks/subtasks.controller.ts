import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TaskStatus } from 'src/constants';
import { Task } from 'src/tasks/task.entity';
import { CreateSubtaskDto, UpdateSubtaskDto } from './interfaces';
import { SubtasksService } from './subtasks.service';

@Controller('subtasks')
export class SubtasksController {
  constructor(private subtaskService: SubtasksService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.subtaskService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findAllByTask(@Param('id') id: number) {
    const task = new Task();
    task.id = id;

    return this.subtaskService.findAllByTask(task);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() subtask: CreateSubtaskDto) {
    await this.subtaskService.create({
      ...subtask,
      status: TaskStatus.IN_PROGRESS,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async update(@Body() subtask: UpdateSubtaskDto) {
    await this.subtaskService.update(subtask);
  }

  @UseGuards(JwtAuthGuard)
  @Put('status')
  async updateStatus(@Body() { id, status }: UpdateSubtaskDto) {
    await this.subtaskService.updateStatus({ id, status });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.subtaskService.remove(id);

    return {
      id: Number(id),
    };
  }
}
