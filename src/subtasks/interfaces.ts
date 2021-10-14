import { TaskStatus } from 'src/constants';
import { Task } from 'src/tasks/task.entity';

export interface CreateSubtaskDto {
  name: string;
  status: TaskStatus;
  task: Task;
}

export interface UpdateSubtaskDto extends Partial<CreateSubtaskDto> {
  id: number;
}
