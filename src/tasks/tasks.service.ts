import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Taskboard } from 'src/taskboards/taskboard.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto, UpdateTaskDto } from './interfaces';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async findAllByTaskboard(taskboard: Taskboard) {
    return this.taskRepository.find({
      where: {
        taskboard,
      },
      relations: ['taskboard'],
    });
  }

  async create({ name, status, taskboard }: CreateTaskDto) {
    const task = new Task();

    task.name = name;
    task.status = status;
    task.taskboard = taskboard;

    return this.taskRepository.save(task);
  }

  async update({ id, ...task }: UpdateTaskDto) {
    return this.taskRepository.update(id, task);
  }

  async updateStatus({ id, status }: UpdateTaskDto) {
    return this.taskRepository.update(id, { status });
  }

  async remove(id: number) {
    return this.taskRepository.delete(id);
  }
}
