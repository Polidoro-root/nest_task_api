import { TaskStatus } from 'src/constants';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Task1634054195304 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'task',
        columns: [
          { name: 'id', type: 'int', isPrimary: true },
          { name: 'name', type: 'varchar' },
          {
            name: 'status',
            type: 'enum',
            enum: ['IN_PROGRESS', 'DONE', 'OVERDUE', 'CANCELED'],
          },
          { name: 'taskboardId', type: 'int' },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    // clear sqls in memory to avoid removing tables when down queries executed.
    queryRunner.clearSqlMemory();

    await queryRunner.createForeignKey(
      'task',
      new TableForeignKey({
        columnNames: ['taskboardId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'taskboard',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('task', 'taskboardId');
    await queryRunner.dropTable('task');
  }
}
