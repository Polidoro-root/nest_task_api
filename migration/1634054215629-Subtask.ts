import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Subtask1634054215629 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'subtask',
        columns: [
          { name: 'id', type: 'int', isPrimary: true },
          { name: 'name', type: 'varchar' },
          {
            name: 'status',
            type: 'enum',
            enum: ['IN_PROGRESS', 'DONE', 'OVERDUE', 'CANCELED'],
          },
          { name: 'taskId', type: 'int' },
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
      'subtask',
      new TableForeignKey({
        columnNames: ['taskId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'task',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('subtask', 'taskId');
    await queryRunner.dropTable('subtask');
  }
}
