import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addApprovedColumnOnOrphanagesTable1608916240449
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orphanages',
      new TableColumn({
        name: 'approved',
        type: 'boolean',
        default: false,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('orphanages', 'approved');
  }
}
