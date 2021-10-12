import { TaskStatus } from 'src/constants';
import { Taskboard } from 'src/taskboards/taskboard.entity';

export interface CreateTaskDto {
  name: string;
  status: TaskStatus;
  taskboard: Taskboard;
}

export interface UpdateTaskDto extends Partial<CreateTaskDto> {
  id: number;
}
