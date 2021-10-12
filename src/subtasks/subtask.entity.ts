import { TaskStatus } from 'src/constants';
import { Task } from 'src/tasks/task.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Subtask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.IN_PROGRESS })
  status: string;

  @ManyToOne((type) => Task, (task) => task.subtasks)
  task: Task;
}
