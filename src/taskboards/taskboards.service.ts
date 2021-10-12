import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateTaskboardDto, UpdateTaskboardDto } from './interfaces';
import { Taskboard } from './taskboard.entity';

@Injectable()
export class TaskboardsService {
  constructor(
    @InjectRepository(Taskboard)
    private taskboardRepository: Repository<Taskboard>,
  ) {}

  async create(taskboard: CreateTaskboardDto, user: User): Promise<any> {
    return this.taskboardRepository.save({ ...taskboard, user });
  }

  async findAll(user: User): Promise<Taskboard[]> {
    return this.taskboardRepository.find({
      where: {
        user,
      },
    });
  }

  async update({ id, name }: UpdateTaskboardDto): Promise<any> {
    return this.taskboardRepository.update(id, { name });
  }

  async remove(id: number): Promise<any> {
    return this.taskboardRepository.delete(id);
  }
}
