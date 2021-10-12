import { Taskboard } from 'src/taskboards/taskboard.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany((type) => Taskboard, (taskboard) => taskboard.user)
  taskboards: Taskboard[];
}
