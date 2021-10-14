import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTaskDto } from 'src/tasks/interfaces';
import { Task } from 'src/tasks/task.entity';
import { Repository } from 'typeorm';
import { CreateSubtaskDto, UpdateSubtaskDto } from './interfaces';
import { Subtask } from './subtask.entity';

@Injectable()
export class SubtasksService {
  constructor(
    @InjectRepository(Subtask) private subtaskRepository: Repository<Subtask>,
  ) {}

  async findAll() {
    return this.subtaskRepository.find({ relations: ['task'] });
  }

  async findAllByTask(task: Task) {
    console.log({ task });
    return this.subtaskRepository.find({
      where: {
        task,
      },
      relations: ['task'],
    });
  }

  async create({ name, status, task }: CreateSubtaskDto) {
    const subtask = new Subtask();

    subtask.name = name;
    subtask.status = status;
    subtask.task = task;

    return this.subtaskRepository.save(subtask);
  }

  async update({ id, ...subtask }: UpdateSubtaskDto) {
    return this.subtaskRepository.update(id, subtask);
  }

  async updateStatus({ id, status }: UpdateSubtaskDto) {
    return this.subtaskRepository.update(id, { status });
  }

  async remove(id: number) {
    return this.subtaskRepository.delete(id);
  }
}
