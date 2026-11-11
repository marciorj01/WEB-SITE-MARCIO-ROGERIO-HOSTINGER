import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "prefix" varchar;
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "_objectkey" varchar;
    ALTER TABLE "_media_v" ADD COLUMN IF NOT EXISTS "version_prefix" varchar;
    ALTER TABLE "_media_v" ADD COLUMN IF NOT EXISTS "version__objectkey" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "media" DROP COLUMN IF EXISTS "prefix";
    ALTER TABLE "media" DROP COLUMN IF EXISTS "_objectkey";
    ALTER TABLE "_media_v" DROP COLUMN IF EXISTS "version_prefix";
    ALTER TABLE "_media_v" DROP COLUMN IF EXISTS "version__objectkey";
  `)
}
