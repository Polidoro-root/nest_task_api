import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Taskboard } from './taskboard.entity';
import { TaskboardsService } from './taskboards.service';
import { TaskboardsController } from './taskboards.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Taskboard])],
  exports: [TypeOrmModule, TaskboardsService],
  providers: [TaskboardsService],
  controllers: [TaskboardsController],
})
export class TaskboardsModule {}
