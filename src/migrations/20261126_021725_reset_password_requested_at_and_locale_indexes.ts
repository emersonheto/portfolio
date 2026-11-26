import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users" ADD COLUMN "reset_password_requested_at" timestamp(3) with time zone;
  CREATE INDEX "profile_locales_parent_id_idx" ON "profile_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_locales_parent_id_idx" ON "projects_locales" USING btree ("_parent_id");
  CREATE INDEX "experience_locales_parent_id_idx" ON "experience_locales" USING btree ("_parent_id");
  CREATE INDEX "education_locales_parent_id_idx" ON "education_locales" USING btree ("_parent_id");
  CREATE INDEX "certifications_locales_parent_id_idx" ON "certifications_locales" USING btree ("_parent_id");
  CREATE INDEX "skills_locales_parent_id_idx" ON "skills_locales" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "profile_locales_parent_id_idx";
  DROP INDEX "projects_locales_parent_id_idx";
  DROP INDEX "experience_locales_parent_id_idx";
  DROP INDEX "education_locales_parent_id_idx";
  DROP INDEX "certifications_locales_parent_id_idx";
  DROP INDEX "skills_locales_parent_id_idx";
  ALTER TABLE "users" DROP COLUMN "reset_password_requested_at";`)
}
