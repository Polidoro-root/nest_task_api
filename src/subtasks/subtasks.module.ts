import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subtask } from './subtask.entity';
import { SubtasksService } from './subtasks.service';
import { SubtasksController } from './subtasks.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Subtask])],
  exports: [TypeOrmModule, SubtasksService],
  providers: [SubtasksService],
  controllers: [SubtasksController],
})
export class SubtasksModule {}
