import { Test, TestingModule } from '@nestjs/testing';
import { TaskboardsController } from './taskboards.controller';

describe('TaskboardsController', () => {
  let controller: TaskboardsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskboardsController],
    }).compile();

    controller = module.get<TaskboardsController>(TaskboardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
