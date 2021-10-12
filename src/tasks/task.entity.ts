import { TaskStatus } from 'src/constants';
import { Subtask } from 'src/subtasks/subtask.entity';
import { Taskboard } from 'src/taskboards/taskboard.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.IN_PROGRESS })
  status: string;

  @ManyToOne((type) => Taskboard, (taskboard) => taskboard.tasks)
  taskboard: Taskboard;

  @OneToMany((type) => Subtask, (subtask) => subtask.task)
  subtasks: Subtask[];
}
