import { Test, TestingModule } from '@nestjs/testing';
import { TaskboardsService } from './taskboards.service';

describe('TaskboardsService', () => {
  let service: TaskboardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskboardsService],
    }).compile();

    service = module.get<TaskboardsService>(TaskboardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
