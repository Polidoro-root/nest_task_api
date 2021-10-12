import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Taskboard } from 'src/taskboards/taskboard.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './interfaces';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async findAll() {
    return this.taskRepository.find({ relations: ['taskboard'] });
  }

  async create({ name, status, taskboard }: CreateTaskDto) {
    const task = new Task();

    task.name = name;
    task.status = status;
    task.taskboard = taskboard;

    return this.taskRepository.save(task);
  }

  async remove(id: number) {
    return this.taskRepository.delete(id);
  }
}
