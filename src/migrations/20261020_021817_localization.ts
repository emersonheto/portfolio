import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'es');
  CREATE TABLE "profile_locales" (
  	"professional_title" varchar NOT NULL,
  	"short_description" varchar NOT NULL,
  	"long_description" varchar NOT NULL,
  	"cv" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "projects_locales" (
  	"name" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "experience_locales" (
  	"company" varchar NOT NULL,
  	"position" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "education_locales" (
  	"institution" varchar NOT NULL,
  	"degree" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "certifications_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "skills_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "profile_locales" ADD CONSTRAINT "profile_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."profile"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_locales" ADD CONSTRAINT "projects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experience_locales" ADD CONSTRAINT "experience_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "education_locales" ADD CONSTRAINT "education_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."education"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "certifications_locales" ADD CONSTRAINT "certifications_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."certifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "skills_locales" ADD CONSTRAINT "skills_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "profile_locales_locale_parent_id_unique" ON "profile_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "projects_locales_locale_parent_id_unique" ON "projects_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "experience_locales_locale_parent_id_unique" ON "experience_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "education_locales_locale_parent_id_unique" ON "education_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "certifications_locales_locale_parent_id_unique" ON "certifications_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "skills_locales_locale_parent_id_unique" ON "skills_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "profile" DROP COLUMN "professional_title";
  ALTER TABLE "profile" DROP COLUMN "short_description";
  ALTER TABLE "profile" DROP COLUMN "long_description";
  ALTER TABLE "profile" DROP COLUMN "cv";
  ALTER TABLE "projects" DROP COLUMN "name";
  ALTER TABLE "projects" DROP COLUMN "description";
  ALTER TABLE "experience" DROP COLUMN "company";
  ALTER TABLE "experience" DROP COLUMN "position";
  ALTER TABLE "experience" DROP COLUMN "description";
  ALTER TABLE "education" DROP COLUMN "institution";
  ALTER TABLE "education" DROP COLUMN "degree";
  ALTER TABLE "education" DROP COLUMN "description";
  ALTER TABLE "certifications" DROP COLUMN "name";
  ALTER TABLE "skills" DROP COLUMN "name";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "profile_locales" CASCADE;
  DROP TABLE "projects_locales" CASCADE;
  DROP TABLE "experience_locales" CASCADE;
  DROP TABLE "education_locales" CASCADE;
  DROP TABLE "certifications_locales" CASCADE;
  DROP TABLE "skills_locales" CASCADE;
  ALTER TABLE "profile" ADD COLUMN "professional_title" varchar NOT NULL;
  ALTER TABLE "profile" ADD COLUMN "short_description" varchar NOT NULL;
  ALTER TABLE "profile" ADD COLUMN "long_description" varchar NOT NULL;
  ALTER TABLE "profile" ADD COLUMN "cv" varchar;
  ALTER TABLE "projects" ADD COLUMN "name" varchar NOT NULL;
  ALTER TABLE "projects" ADD COLUMN "description" varchar NOT NULL;
  ALTER TABLE "experience" ADD COLUMN "company" varchar NOT NULL;
  ALTER TABLE "experience" ADD COLUMN "position" varchar NOT NULL;
  ALTER TABLE "experience" ADD COLUMN "description" varchar NOT NULL;
  ALTER TABLE "education" ADD COLUMN "institution" varchar NOT NULL;
  ALTER TABLE "education" ADD COLUMN "degree" varchar NOT NULL;
  ALTER TABLE "education" ADD COLUMN "description" varchar;
  ALTER TABLE "certifications" ADD COLUMN "name" varchar NOT NULL;
  ALTER TABLE "skills" ADD COLUMN "name" varchar NOT NULL;
  DROP TYPE "public"."_locales";`)
}
