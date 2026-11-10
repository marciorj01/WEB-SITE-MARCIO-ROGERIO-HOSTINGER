import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_categories_tone" AS ENUM('navy', 'olive', 'sand', 'slate', 'terracotta', 'sage', 'gold');
  CREATE TYPE "public"."enum__categories_v_version_tone" AS ENUM('navy', 'olive', 'sand', 'slate', 'terracotta', 'sage', 'gold');
  CREATE TYPE "public"."enum_articles_format" AS ENUM('article', 'guide', 'report', 'sponsored');
  CREATE TYPE "public"."enum_articles_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__articles_v_version_format" AS ENUM('article', 'guide', 'report', 'sponsored');
  CREATE TYPE "public"."enum__articles_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_properties_segment" AS ENUM('first', 'medium', 'high');
  CREATE TYPE "public"."enum_properties_type" AS ENUM('Casa', 'Apartamento', 'Studio', 'Cobertura');
  CREATE TYPE "public"."enum_properties_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__properties_v_version_segment" AS ENUM('first', 'medium', 'high');
  CREATE TYPE "public"."enum__properties_v_version_type" AS ENUM('Casa', 'Apartamento', 'Studio', 'Cobertura');
  CREATE TYPE "public"."enum__properties_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_developments_launch_stage" AS ENUM('reference', 'prelaunch', 'launch', 'construction', 'ready');
  CREATE TYPE "public"."enum_developments_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__developments_v_version_launch_stage" AS ENUM('reference', 'prelaunch', 'launch', 'construction', 'ready');
  CREATE TYPE "public"."enum__developments_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_leads_intent" AS ENUM('contact', 'buy', 'sell', 'invest', 'development', 'material');
  CREATE TYPE "public"."enum_leads_property_type" AS ENUM('Casa', 'Apartamento', 'Studio', 'Cobertura', 'Terreno', 'Outro');
  CREATE TYPE "public"."enum_leads_status" AS ENUM('new', 'contacted', 'completed');
  CREATE TYPE "public"."enum__leads_v_version_intent" AS ENUM('contact', 'buy', 'sell', 'invest', 'development', 'material');
  CREATE TYPE "public"."enum__leads_v_version_property_type" AS ENUM('Casa', 'Apartamento', 'Studio', 'Cobertura', 'Terreno', 'Outro');
  CREATE TYPE "public"."enum__leads_v_version_status" AS ENUM('new', 'contacted', 'completed');
  CREATE TYPE "public"."enum_payload_llm_instructions_entity_type" AS ENUM('collection', 'global');
  CREATE TYPE "public"."enum_brand_hero_slides_media_type" AS ENUM('image', 'video');
  CREATE TYPE "public"."enum__brand_v_version_hero_slides_media_type" AS ENUM('image', 'video');
  CREATE TABLE "admins_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "admins" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "admins_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"admins_id" integer
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"_h_folders_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"original_filename" varchar,
  	"original_url" varchar,
  	"original_mime_type" varchar,
  	"original_filesize" numeric,
  	"original_width" numeric,
  	"original_height" numeric,
  	"original_prefix" varchar,
  	"original__objectkey" varchar,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "media_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tags_id" integer,
  	"admins_id" integer
  );
  
  CREATE TABLE "_media_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_alt" varchar NOT NULL,
  	"version__h_folders_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_url" varchar,
  	"version_thumbnail_u_r_l" varchar,
  	"version_filename" varchar,
  	"version_mime_type" varchar,
  	"version_filesize" numeric,
  	"version_width" numeric,
  	"version_height" numeric,
  	"version_original_filename" varchar,
  	"version_original_url" varchar,
  	"version_original_mime_type" varchar,
  	"version_original_filesize" numeric,
  	"version_original_width" numeric,
  	"version_original_height" numeric,
  	"version_original_prefix" varchar,
  	"version_original__objectkey" varchar,
  	"version_focal_x" numeric,
  	"version_focal_y" numeric,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_media_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tags_id" integer,
  	"admins_id" integer
  );
  
  CREATE TABLE "folders" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_h_folders_id" integer,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "folders_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"admins_id" integer
  );
  
  CREATE TABLE "_folders_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version__h_folders_id" integer,
  	"version_name" varchar NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_folders_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"admins_id" integer
  );
  
  CREATE TABLE "tags" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_h_tags_id" integer,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tags_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"admins_id" integer
  );
  
  CREATE TABLE "_tags_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version__h_tags_id" integer,
  	"version_name" varchar NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_tags_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"admins_id" integer
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"tone" "enum_categories_tone" DEFAULT 'navy',
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "categories_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"admins_id" integer
  );
  
  CREATE TABLE "_categories_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar NOT NULL,
  	"version_slug" varchar NOT NULL,
  	"version_description" varchar,
  	"version_tone" "enum__categories_v_version_tone" DEFAULT 'navy',
  	"version_order" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_categories_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"admins_id" integer
  );
  
  CREATE TABLE "authors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"bio" varchar,
  	"portrait_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "authors_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"admins_id" integer
  );
  
  CREATE TABLE "_authors_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar NOT NULL,
  	"version_bio" varchar,
  	"version_portrait_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_authors_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"admins_id" integer
  );
  
  CREATE TABLE "articles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"subtitle" varchar,
  	"cover_id" integer,
  	"video_url" varchar,
  	"category_id" integer,
  	"author_id" integer,
  	"published_at" timestamp(3) with time zone,
  	"reading_time" numeric DEFAULT 5,
  	"featured" boolean DEFAULT false,
  	"order" numeric DEFAULT 0,
  	"format" "enum_articles_format" DEFAULT 'article',
  	"sponsor" varchar,
  	"content" jsonb,
  	"pullquote" varchar,
  	"inline_image_id" integer,
  	"conclusion" jsonb,
  	"contact_prompt" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_articles_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "articles_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"admins_id" integer
  );
  
  CREATE TABLE "_articles_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_subtitle" varchar,
  	"version_cover_id" integer,
  	"version_video_url" varchar,
  	"version_category_id" integer,
  	"version_author_id" integer,
  	"version_published_at" timestamp(3) with time zone,
  	"version_reading_time" numeric DEFAULT 5,
  	"version_featured" boolean DEFAULT false,
  	"version_order" numeric DEFAULT 0,
  	"version_format" "enum__articles_v_version_format" DEFAULT 'article',
  	"version_sponsor" varchar,
  	"version_content" jsonb,
  	"version_pullquote" varchar,
  	"version_inline_image_id" integer,
  	"version_conclusion" jsonb,
  	"version_contact_prompt" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__articles_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_articles_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"admins_id" integer
  );
  
  CREATE TABLE "properties_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "properties_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "properties" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"tour360_url" varchar,
  	"video_url" varchar,
  	"segment" "enum_properties_segment",
  	"type" "enum_properties_type" DEFAULT 'Casa',
  	"location" varchar,
  	"area" numeric,
  	"bedrooms" numeric,
  	"suites" numeric,
  	"parking" numeric,
  	"price" numeric,
  	"investment" boolean DEFAULT false,
  	"reference_only" boolean DEFAULT true,
  	"featured" boolean DEFAULT false,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_properties_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "properties_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"admins_id" integer
  );
  
  CREATE TABLE "_properties_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_properties_v_version_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_properties_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_subtitle" varchar,
  	"version_description" varchar,
  	"version_image_id" integer,
  	"version_tour360_url" varchar,
  	"version_video_url" varchar,
  	"version_segment" "enum__properties_v_version_segment",
  	"version_type" "enum__properties_v_version_type" DEFAULT 'Casa',
  	"version_location" varchar,
  	"version_area" numeric,
  	"version_bedrooms" numeric,
  	"version_suites" numeric,
  	"version_parking" numeric,
  	"version_price" numeric,
  	"version_investment" boolean DEFAULT false,
  	"version_reference_only" boolean DEFAULT true,
  	"version_featured" boolean DEFAULT false,
  	"version_order" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__properties_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_properties_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"admins_id" integer
  );
  
  CREATE TABLE "developments_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "developments_typologies" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"area" varchar,
  	"bedrooms" varchar,
  	"plan_id" integer
  );
  
  CREATE TABLE "developments_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "developments" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"tour360_url" varchar,
  	"video_url" varchar,
  	"location" varchar,
  	"architecture" varchar,
  	"launch_stage" "enum_developments_launch_stage" DEFAULT 'reference',
  	"reference_only" boolean DEFAULT true,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_developments_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "developments_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"admins_id" integer
  );
  
  CREATE TABLE "_developments_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_developments_v_version_typologies" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"area" varchar,
  	"bedrooms" varchar,
  	"plan_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_developments_v_version_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_developments_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_subtitle" varchar,
  	"version_description" varchar,
  	"version_image_id" integer,
  	"version_tour360_url" varchar,
  	"version_video_url" varchar,
  	"version_location" varchar,
  	"version_architecture" varchar,
  	"version_launch_stage" "enum__developments_v_version_launch_stage" DEFAULT 'reference',
  	"version_reference_only" boolean DEFAULT true,
  	"version_order" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__developments_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_developments_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"admins_id" integer
  );
  
  CREATE TABLE "leads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"whatsapp" varchar NOT NULL,
  	"intent" "enum_leads_intent" NOT NULL,
  	"property_type" "enum_leads_property_type",
  	"location" varchar,
  	"message" varchar,
  	"property_id" integer,
  	"development_id" integer,
  	"consent" boolean DEFAULT false NOT NULL,
  	"status" "enum_leads_status" DEFAULT 'new',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "leads_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"admins_id" integer
  );
  
  CREATE TABLE "_leads_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar NOT NULL,
  	"version_email" varchar NOT NULL,
  	"version_whatsapp" varchar NOT NULL,
  	"version_intent" "enum__leads_v_version_intent" NOT NULL,
  	"version_property_type" "enum__leads_v_version_property_type",
  	"version_location" varchar,
  	"version_message" varchar,
  	"version_property_id" integer,
  	"version_development_id" integer,
  	"version_consent" boolean DEFAULT false NOT NULL,
  	"version_status" "enum__leads_v_version_status" DEFAULT 'new',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_leads_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"admins_id" integer
  );
  
  CREATE TABLE "newsletter_subscribers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"consent" boolean DEFAULT false NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "newsletter_subscribers_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"admins_id" integer
  );
  
  CREATE TABLE "_newsletter_subscribers_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar NOT NULL,
  	"version_email" varchar NOT NULL,
  	"version_consent" boolean DEFAULT false NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_newsletter_subscribers_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"admins_id" integer
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"admins_id" integer,
  	"media_id" integer,
  	"folders_id" integer,
  	"tags_id" integer,
  	"categories_id" integer,
  	"authors_id" integer,
  	"articles_id" integer,
  	"properties_id" integer,
  	"developments_id" integer,
  	"leads_id" integer,
  	"newsletter_subscribers_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"admins_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_llm_instructions" (
  	"id" varchar PRIMARY KEY NOT NULL,
  	"entity_slug" varchar NOT NULL,
  	"entity_type" "enum_payload_llm_instructions_entity_type" NOT NULL,
  	"additional_instructions" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_llm_instructions_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" varchar NOT NULL,
  	"path" varchar NOT NULL,
  	"admins_id" integer
  );
  
  CREATE TABLE "brand_hero_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_type" "enum_brand_hero_slides_media_type" DEFAULT 'image',
  	"image_id" integer,
  	"video_id" integer,
  	"video_url" varchar,
  	"caption" varchar
  );
  
  CREATE TABLE "brand" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT 'Marcio Rogério',
  	"tagline" varchar DEFAULT 'Corretor de Imóveis',
  	"demo_notice" varchar,
  	"whatsapp" varchar,
  	"email" varchar,
  	"professional_registration" varchar DEFAULT 'CRECI F-59.138-F',
  	"service_location" varchar,
  	"hero_video_id" integer,
  	"hero_video_url" varchar,
  	"consulting_image_id" integer,
  	"invest_image_id" integer,
  	"sell_image_id" integer,
  	"about_image_id" integer,
  	"profile_name" varchar DEFAULT 'Marcio Rogério',
  	"profile_role" varchar DEFAULT 'Corretor de Imóveis',
  	"biography" varchar,
  	"philosophy" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "brand_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"admins_id" integer
  );
  
  CREATE TABLE "_brand_v_version_hero_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_type" "enum__brand_v_version_hero_slides_media_type" DEFAULT 'image',
  	"image_id" integer,
  	"video_id" integer,
  	"video_url" varchar,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_brand_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_name" varchar DEFAULT 'Marcio Rogério',
  	"version_tagline" varchar DEFAULT 'Corretor de Imóveis',
  	"version_demo_notice" varchar,
  	"version_whatsapp" varchar,
  	"version_email" varchar,
  	"version_professional_registration" varchar DEFAULT 'CRECI F-59.138-F',
  	"version_service_location" varchar,
  	"version_hero_video_id" integer,
  	"version_hero_video_url" varchar,
  	"version_consulting_image_id" integer,
  	"version_invest_image_id" integer,
  	"version_sell_image_id" integer,
  	"version_about_image_id" integer,
  	"version_profile_name" varchar DEFAULT 'Marcio Rogério',
  	"version_profile_role" varchar DEFAULT 'Corretor de Imóveis',
  	"version_biography" varchar,
  	"version_philosophy" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_brand_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"admins_id" integer
  );
  
  ALTER TABLE "admins_sessions" ADD CONSTRAINT "admins_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."admins"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "admins_rels" ADD CONSTRAINT "admins_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."admins"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "admins_rels" ADD CONSTRAINT "admins_rels_admins_fk" FOREIGN KEY ("admins_id") REFERENCES "public"."admins"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media" ADD CONSTRAINT "media__h_folders_id_folders_id_fk" FOREIGN KEY ("_h_folders_id") REFERENCES "public"."folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media_rels" ADD CONSTRAINT "media_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_rels" ADD CONSTRAINT "media_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_rels" ADD CONSTRAINT "media_rels_admins_fk" FOREIGN KEY ("admins_id") REFERENCES "public"."admins"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_media_v" ADD CONSTRAINT "_media_v_parent_id_media_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_media_v" ADD CONSTRAINT "_media_v_version__h_folders_id_folders_id_fk" FOREIGN KEY ("version__h_folders_id") REFERENCES "public"."folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_media_v_rels" ADD CONSTRAINT "_media_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_media_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_media_v_rels" ADD CONSTRAINT "_media_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_media_v_rels" ADD CONSTRAINT "_media_v_rels_admins_fk" FOREIGN KEY ("admins_id") REFERENCES "public"."admins"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "folders" ADD CONSTRAINT "folders__h_folders_id_folders_id_fk" FOREIGN KEY ("_h_folders_id") REFERENCES "public"."folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "folders_rels" ADD CONSTRAINT "folders_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "folders_rels" ADD CONSTRAINT "folders_rels_admins_fk" FOREIGN KEY ("admins_id") REFERENCES "public"."admins"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_folders_v" ADD CONSTRAINT "_folders_v_parent_id_folders_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_folders_v" ADD CONSTRAINT "_folders_v_version__h_folders_id_folders_id_fk" FOREIGN KEY ("version__h_folders_id") REFERENCES "public"."folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_folders_v_rels" ADD CONSTRAINT "_folders_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_folders_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_folders_v_rels" ADD CONSTRAINT "_folders_v_rels_admins_fk" FOREIGN KEY ("admins_id") REFERENCES "public"."admins"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tags" ADD CONSTRAINT "tags__h_tags_id_tags_id_fk" FOREIGN KEY ("_h_tags_id") REFERENCES "public"."tags"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tags_rels" ADD CONSTRAINT "tags_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tags_rels" ADD CONSTRAINT "tags_rels_admins_fk" FOREIGN KEY ("admins_id") REFERENCES "public"."admins"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tags_v" ADD CONSTRAINT "_tags_v_parent_id_tags_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tags"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_tags_v" ADD CONSTRAINT "_tags_v_version__h_tags_id_tags_id_fk" FOREIGN KEY ("version__h_tags_id") REFERENCES "public"."tags"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_tags_v_rels" ADD CONSTRAINT "_tags_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_tags_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tags_v_rels" ADD CONSTRAINT "_tags_v_rels_admins_fk" FOREIGN KEY ("admins_id") REFERENCES "public"."admins"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_rels" ADD CONSTRAINT "categories_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_rels" ADD CONSTRAINT "categories_rels_admins_fk" FOREIGN KEY ("admins_id") REFERENCES "public"."admins"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categories_v" ADD CONSTRAINT "_categories_v_parent_id_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_categories_v_rels" ADD CONSTRAINT "_categories_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_categories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categories_v_rels" ADD CONSTRAINT "_categories_v_rels_admins_fk" FOREIGN KEY ("admins_id") REFERENCES "public"."admins"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "authors" ADD CONSTRAINT "authors_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "authors_rels" ADD CONSTRAINT "authors_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "authors_rels" ADD CONSTRAINT "authors_rels_admins_fk" FOREIGN KEY ("admins_id") REFERENCES "public"."admins"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_authors_v" ADD CONSTRAINT "_authors_v_parent_id_authors_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_authors_v" ADD CONSTRAINT "_authors_v_version_portrait_id_media_id_fk" FOREIGN KEY ("version_portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_authors_v_rels" ADD CONSTRAINT "_authors_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_authors_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_authors_v_rels" ADD CONSTRAINT "_authors_v_rels_admins_fk" FOREIGN KEY ("admins_id") REFERENCES "public"."admins"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_inline_image_id_media_id_fk" FOREIGN KEY ("inline_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_admins_fk" FOREIGN KEY ("admins_id") REFERENCES "public"."admins"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_parent_id_articles_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articles"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_version_cover_id_media_id_fk" FOREIGN KEY ("version_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_version_category_id_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_version_author_id_authors_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_version_inline_image_id_media_id_fk" FOREIGN KEY ("version_inline_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_admins_fk" FOREIGN KEY ("admins_id") REFERENCES "public"."admins"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "properties_gallery" ADD CONSTRAINT "properties_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "properties_gallery" ADD CONSTRAINT "properties_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."properties"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "properties_features" ADD CONSTRAINT "properties_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."properties"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "properties" ADD CONSTRAINT "properties_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "properties_rels" ADD CONSTRAINT "properties_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."properties"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "properties_rels" ADD CONSTRAINT "properties_rels_admins_fk" FOREIGN KEY ("admins_id") REFERENCES "public"."admins"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_properties_v_version_gallery" ADD CONSTRAINT "_properties_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_properties_v_version_gallery" ADD CONSTRAINT "_properties_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_properties_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_properties_v_version_features" ADD CONSTRAINT "_properties_v_version_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_properties_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_properties_v" ADD CONSTRAINT "_properties_v_parent_id_properties_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."properties"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_properties_v" ADD CONSTRAINT "_properties_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_properties_v_rels" ADD CONSTRAINT "_properties_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_properties_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_properties_v_rels" ADD CONSTRAINT "_properties_v_rels_admins_fk" FOREIGN KEY ("admins_id") REFERENCES "public"."admins"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "developments_gallery" ADD CONSTRAINT "developments_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "developments_gallery" ADD CONSTRAINT "developments_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."developments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "developments_typologies" ADD CONSTRAINT "developments_typologies_plan_id_media_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "developments_typologies" ADD CONSTRAINT "developments_typologies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."developments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "developments_features" ADD CONSTRAINT "developments_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."developments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "developments" ADD CONSTRAINT "developments_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "developments_rels" ADD CONSTRAINT "developments_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."developments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "developments_rels" ADD CONSTRAINT "developments_rels_admins_fk" FOREIGN KEY ("admins_id") REFERENCES "public"."admins"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_developments_v_version_gallery" ADD CONSTRAINT "_developments_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_developments_v_version_gallery" ADD CONSTRAINT "_developments_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_developments_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_developments_v_version_typologies" ADD CONSTRAINT "_developments_v_version_typologies_plan_id_media_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_developments_v_version_typologies" ADD CONSTRAINT "_developments_v_version_typologies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_developments_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_developments_v_version_features" ADD CONSTRAINT "_developments_v_version_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_developments_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_developments_v" ADD CONSTRAINT "_developments_v_parent_id_developments_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."developments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_developments_v" ADD CONSTRAINT "_developments_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_developments_v_rels" ADD CONSTRAINT "_developments_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_developments_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_developments_v_rels" ADD CONSTRAINT "_developments_v_rels_admins_fk" FOREIGN KEY ("admins_id") REFERENCES "public"."admins"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leads" ADD CONSTRAINT "leads_property_id_properties_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "leads" ADD CONSTRAINT "leads_development_id_developments_id_fk" FOREIGN KEY ("development_id") REFERENCES "public"."developments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "leads_rels" ADD CONSTRAINT "leads_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leads_rels" ADD CONSTRAINT "leads_rels_admins_fk" FOREIGN KEY ("admins_id") REFERENCES "public"."admins"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_leads_v" ADD CONSTRAINT "_leads_v_parent_id_leads_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."leads"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_leads_v" ADD CONSTRAINT "_leads_v_version_property_id_properties_id_fk" FOREIGN KEY ("version_property_id") REFERENCES "public"."properties"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_leads_v" ADD CONSTRAINT "_leads_v_version_development_id_developments_id_fk" FOREIGN KEY ("version_development_id") REFERENCES "public"."developments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_leads_v_rels" ADD CONSTRAINT "_leads_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_leads_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_leads_v_rels" ADD CONSTRAINT "_leads_v_rels_admins_fk" FOREIGN KEY ("admins_id") REFERENCES "public"."admins"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "newsletter_subscribers_rels" ADD CONSTRAINT "newsletter_subscribers_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."newsletter_subscribers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "newsletter_subscribers_rels" ADD CONSTRAINT "newsletter_subscribers_rels_admins_fk" FOREIGN KEY ("admins_id") REFERENCES "public"."admins"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_newsletter_subscribers_v" ADD CONSTRAINT "_newsletter_subscribers_v_parent_id_newsletter_subscribers_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."newsletter_subscribers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_newsletter_subscribers_v_rels" ADD CONSTRAINT "_newsletter_subscribers_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_newsletter_subscribers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_newsletter_subscribers_v_rels" ADD CONSTRAINT "_newsletter_subscribers_v_rels_admins_fk" FOREIGN KEY ("admins_id") REFERENCES "public"."admins"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_admins_fk" FOREIGN KEY ("admins_id") REFERENCES "public"."admins"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_folders_fk" FOREIGN KEY ("folders_id") REFERENCES "public"."folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_authors_fk" FOREIGN KEY ("authors_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_properties_fk" FOREIGN KEY ("properties_id") REFERENCES "public"."properties"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_developments_fk" FOREIGN KEY ("developments_id") REFERENCES "public"."developments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_leads_fk" FOREIGN KEY ("leads_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_newsletter_subscribers_fk" FOREIGN KEY ("newsletter_subscribers_id") REFERENCES "public"."newsletter_subscribers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_admins_fk" FOREIGN KEY ("admins_id") REFERENCES "public"."admins"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_llm_instructions_rels" ADD CONSTRAINT "payload_llm_instructions_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_llm_instructions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_llm_instructions_rels" ADD CONSTRAINT "payload_llm_instructions_rels_admins_fk" FOREIGN KEY ("admins_id") REFERENCES "public"."admins"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "brand_hero_slides" ADD CONSTRAINT "brand_hero_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "brand_hero_slides" ADD CONSTRAINT "brand_hero_slides_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "brand_hero_slides" ADD CONSTRAINT "brand_hero_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."brand"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "brand" ADD CONSTRAINT "brand_hero_video_id_media_id_fk" FOREIGN KEY ("hero_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "brand" ADD CONSTRAINT "brand_consulting_image_id_media_id_fk" FOREIGN KEY ("consulting_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "brand" ADD CONSTRAINT "brand_invest_image_id_media_id_fk" FOREIGN KEY ("invest_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "brand" ADD CONSTRAINT "brand_sell_image_id_media_id_fk" FOREIGN KEY ("sell_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "brand" ADD CONSTRAINT "brand_about_image_id_media_id_fk" FOREIGN KEY ("about_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "brand_rels" ADD CONSTRAINT "brand_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."brand"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "brand_rels" ADD CONSTRAINT "brand_rels_admins_fk" FOREIGN KEY ("admins_id") REFERENCES "public"."admins"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_brand_v_version_hero_slides" ADD CONSTRAINT "_brand_v_version_hero_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_brand_v_version_hero_slides" ADD CONSTRAINT "_brand_v_version_hero_slides_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_brand_v_version_hero_slides" ADD CONSTRAINT "_brand_v_version_hero_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_brand_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_brand_v" ADD CONSTRAINT "_brand_v_version_hero_video_id_media_id_fk" FOREIGN KEY ("version_hero_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_brand_v" ADD CONSTRAINT "_brand_v_version_consulting_image_id_media_id_fk" FOREIGN KEY ("version_consulting_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_brand_v" ADD CONSTRAINT "_brand_v_version_invest_image_id_media_id_fk" FOREIGN KEY ("version_invest_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_brand_v" ADD CONSTRAINT "_brand_v_version_sell_image_id_media_id_fk" FOREIGN KEY ("version_sell_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_brand_v" ADD CONSTRAINT "_brand_v_version_about_image_id_media_id_fk" FOREIGN KEY ("version_about_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_brand_v_rels" ADD CONSTRAINT "_brand_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_brand_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_brand_v_rels" ADD CONSTRAINT "_brand_v_rels_admins_fk" FOREIGN KEY ("admins_id") REFERENCES "public"."admins"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "admins_sessions_order_idx" ON "admins_sessions" USING btree ("_order");
  CREATE INDEX "admins_sessions_parent_id_idx" ON "admins_sessions" USING btree ("_parent_id");
  CREATE INDEX "admins_updated_at_idx" ON "admins" USING btree ("updated_at");
  CREATE INDEX "admins_created_at_idx" ON "admins" USING btree ("created_at");
  CREATE UNIQUE INDEX "admins_email_idx" ON "admins" USING btree ("email");
  CREATE INDEX "admins_rels_order_idx" ON "admins_rels" USING btree ("order");
  CREATE INDEX "admins_rels_parent_idx" ON "admins_rels" USING btree ("parent_id");
  CREATE INDEX "admins_rels_path_idx" ON "admins_rels" USING btree ("path");
  CREATE INDEX "admins_rels_admins_id_idx" ON "admins_rels" USING btree ("admins_id");
  CREATE INDEX "media__h_folders_idx" ON "media" USING btree ("_h_folders_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_original_original_filename_idx" ON "media" USING btree ("original_filename");
  CREATE INDEX "media_rels_order_idx" ON "media_rels" USING btree ("order");
  CREATE INDEX "media_rels_parent_idx" ON "media_rels" USING btree ("parent_id");
  CREATE INDEX "media_rels_path_idx" ON "media_rels" USING btree ("path");
  CREATE INDEX "media_rels_tags_id_idx" ON "media_rels" USING btree ("tags_id");
  CREATE INDEX "media_rels_admins_id_idx" ON "media_rels" USING btree ("admins_id");
  CREATE INDEX "_media_v_parent_idx" ON "_media_v" USING btree ("parent_id");
  CREATE INDEX "_media_v_version_version__h_folders_idx" ON "_media_v" USING btree ("version__h_folders_id");
  CREATE INDEX "_media_v_version_version_updated_at_idx" ON "_media_v" USING btree ("version_updated_at");
  CREATE INDEX "_media_v_version_version_created_at_idx" ON "_media_v" USING btree ("version_created_at");
  CREATE INDEX "_media_v_version_version_filename_idx" ON "_media_v" USING btree ("version_filename");
  CREATE INDEX "_media_v_version_original_version_original_filename_idx" ON "_media_v" USING btree ("version_original_filename");
  CREATE INDEX "_media_v_created_at_idx" ON "_media_v" USING btree ("created_at");
  CREATE INDEX "_media_v_updated_at_idx" ON "_media_v" USING btree ("updated_at");
  CREATE INDEX "_media_v_rels_order_idx" ON "_media_v_rels" USING btree ("order");
  CREATE INDEX "_media_v_rels_parent_idx" ON "_media_v_rels" USING btree ("parent_id");
  CREATE INDEX "_media_v_rels_path_idx" ON "_media_v_rels" USING btree ("path");
  CREATE INDEX "_media_v_rels_tags_id_idx" ON "_media_v_rels" USING btree ("tags_id");
  CREATE INDEX "_media_v_rels_admins_id_idx" ON "_media_v_rels" USING btree ("admins_id");
  CREATE INDEX "folders__h_folders_idx" ON "folders" USING btree ("_h_folders_id");
  CREATE INDEX "folders_updated_at_idx" ON "folders" USING btree ("updated_at");
  CREATE INDEX "folders_created_at_idx" ON "folders" USING btree ("created_at");
  CREATE INDEX "folders_rels_order_idx" ON "folders_rels" USING btree ("order");
  CREATE INDEX "folders_rels_parent_idx" ON "folders_rels" USING btree ("parent_id");
  CREATE INDEX "folders_rels_path_idx" ON "folders_rels" USING btree ("path");
  CREATE INDEX "folders_rels_admins_id_idx" ON "folders_rels" USING btree ("admins_id");
  CREATE INDEX "_folders_v_parent_idx" ON "_folders_v" USING btree ("parent_id");
  CREATE INDEX "_folders_v_version_version__h_folders_idx" ON "_folders_v" USING btree ("version__h_folders_id");
  CREATE INDEX "_folders_v_version_version_updated_at_idx" ON "_folders_v" USING btree ("version_updated_at");
  CREATE INDEX "_folders_v_version_version_created_at_idx" ON "_folders_v" USING btree ("version_created_at");
  CREATE INDEX "_folders_v_created_at_idx" ON "_folders_v" USING btree ("created_at");
  CREATE INDEX "_folders_v_updated_at_idx" ON "_folders_v" USING btree ("updated_at");
  CREATE INDEX "_folders_v_rels_order_idx" ON "_folders_v_rels" USING btree ("order");
  CREATE INDEX "_folders_v_rels_parent_idx" ON "_folders_v_rels" USING btree ("parent_id");
  CREATE INDEX "_folders_v_rels_path_idx" ON "_folders_v_rels" USING btree ("path");
  CREATE INDEX "_folders_v_rels_admins_id_idx" ON "_folders_v_rels" USING btree ("admins_id");
  CREATE INDEX "tags__h_tags_idx" ON "tags" USING btree ("_h_tags_id");
  CREATE INDEX "tags_updated_at_idx" ON "tags" USING btree ("updated_at");
  CREATE INDEX "tags_created_at_idx" ON "tags" USING btree ("created_at");
  CREATE INDEX "tags_rels_order_idx" ON "tags_rels" USING btree ("order");
  CREATE INDEX "tags_rels_parent_idx" ON "tags_rels" USING btree ("parent_id");
  CREATE INDEX "tags_rels_path_idx" ON "tags_rels" USING btree ("path");
  CREATE INDEX "tags_rels_admins_id_idx" ON "tags_rels" USING btree ("admins_id");
  CREATE INDEX "_tags_v_parent_idx" ON "_tags_v" USING btree ("parent_id");
  CREATE INDEX "_tags_v_version_version__h_tags_idx" ON "_tags_v" USING btree ("version__h_tags_id");
  CREATE INDEX "_tags_v_version_version_updated_at_idx" ON "_tags_v" USING btree ("version_updated_at");
  CREATE INDEX "_tags_v_version_version_created_at_idx" ON "_tags_v" USING btree ("version_created_at");
  CREATE INDEX "_tags_v_created_at_idx" ON "_tags_v" USING btree ("created_at");
  CREATE INDEX "_tags_v_updated_at_idx" ON "_tags_v" USING btree ("updated_at");
  CREATE INDEX "_tags_v_rels_order_idx" ON "_tags_v_rels" USING btree ("order");
  CREATE INDEX "_tags_v_rels_parent_idx" ON "_tags_v_rels" USING btree ("parent_id");
  CREATE INDEX "_tags_v_rels_path_idx" ON "_tags_v_rels" USING btree ("path");
  CREATE INDEX "_tags_v_rels_admins_id_idx" ON "_tags_v_rels" USING btree ("admins_id");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX "categories_rels_order_idx" ON "categories_rels" USING btree ("order");
  CREATE INDEX "categories_rels_parent_idx" ON "categories_rels" USING btree ("parent_id");
  CREATE INDEX "categories_rels_path_idx" ON "categories_rels" USING btree ("path");
  CREATE INDEX "categories_rels_admins_id_idx" ON "categories_rels" USING btree ("admins_id");
  CREATE INDEX "_categories_v_parent_idx" ON "_categories_v" USING btree ("parent_id");
  CREATE INDEX "_categories_v_version_version_slug_idx" ON "_categories_v" USING btree ("version_slug");
  CREATE INDEX "_categories_v_version_version_updated_at_idx" ON "_categories_v" USING btree ("version_updated_at");
  CREATE INDEX "_categories_v_version_version_created_at_idx" ON "_categories_v" USING btree ("version_created_at");
  CREATE INDEX "_categories_v_created_at_idx" ON "_categories_v" USING btree ("created_at");
  CREATE INDEX "_categories_v_updated_at_idx" ON "_categories_v" USING btree ("updated_at");
  CREATE INDEX "_categories_v_rels_order_idx" ON "_categories_v_rels" USING btree ("order");
  CREATE INDEX "_categories_v_rels_parent_idx" ON "_categories_v_rels" USING btree ("parent_id");
  CREATE INDEX "_categories_v_rels_path_idx" ON "_categories_v_rels" USING btree ("path");
  CREATE INDEX "_categories_v_rels_admins_id_idx" ON "_categories_v_rels" USING btree ("admins_id");
  CREATE INDEX "authors_portrait_idx" ON "authors" USING btree ("portrait_id");
  CREATE INDEX "authors_updated_at_idx" ON "authors" USING btree ("updated_at");
  CREATE INDEX "authors_created_at_idx" ON "authors" USING btree ("created_at");
  CREATE INDEX "authors_rels_order_idx" ON "authors_rels" USING btree ("order");
  CREATE INDEX "authors_rels_parent_idx" ON "authors_rels" USING btree ("parent_id");
  CREATE INDEX "authors_rels_path_idx" ON "authors_rels" USING btree ("path");
  CREATE INDEX "authors_rels_admins_id_idx" ON "authors_rels" USING btree ("admins_id");
  CREATE INDEX "_authors_v_parent_idx" ON "_authors_v" USING btree ("parent_id");
  CREATE INDEX "_authors_v_version_version_portrait_idx" ON "_authors_v" USING btree ("version_portrait_id");
  CREATE INDEX "_authors_v_version_version_updated_at_idx" ON "_authors_v" USING btree ("version_updated_at");
  CREATE INDEX "_authors_v_version_version_created_at_idx" ON "_authors_v" USING btree ("version_created_at");
  CREATE INDEX "_authors_v_created_at_idx" ON "_authors_v" USING btree ("created_at");
  CREATE INDEX "_authors_v_updated_at_idx" ON "_authors_v" USING btree ("updated_at");
  CREATE INDEX "_authors_v_rels_order_idx" ON "_authors_v_rels" USING btree ("order");
  CREATE INDEX "_authors_v_rels_parent_idx" ON "_authors_v_rels" USING btree ("parent_id");
  CREATE INDEX "_authors_v_rels_path_idx" ON "_authors_v_rels" USING btree ("path");
  CREATE INDEX "_authors_v_rels_admins_id_idx" ON "_authors_v_rels" USING btree ("admins_id");
  CREATE UNIQUE INDEX "articles_slug_idx" ON "articles" USING btree ("slug");
  CREATE INDEX "articles_cover_idx" ON "articles" USING btree ("cover_id");
  CREATE INDEX "articles_category_idx" ON "articles" USING btree ("category_id");
  CREATE INDEX "articles_author_idx" ON "articles" USING btree ("author_id");
  CREATE INDEX "articles_inline_image_idx" ON "articles" USING btree ("inline_image_id");
  CREATE INDEX "articles_updated_at_idx" ON "articles" USING btree ("updated_at");
  CREATE INDEX "articles_created_at_idx" ON "articles" USING btree ("created_at");
  CREATE INDEX "articles__status_idx" ON "articles" USING btree ("_status");
  CREATE INDEX "articles_rels_order_idx" ON "articles_rels" USING btree ("order");
  CREATE INDEX "articles_rels_parent_idx" ON "articles_rels" USING btree ("parent_id");
  CREATE INDEX "articles_rels_path_idx" ON "articles_rels" USING btree ("path");
  CREATE INDEX "articles_rels_admins_id_idx" ON "articles_rels" USING btree ("admins_id");
  CREATE INDEX "_articles_v_parent_idx" ON "_articles_v" USING btree ("parent_id");
  CREATE INDEX "_articles_v_version_version_slug_idx" ON "_articles_v" USING btree ("version_slug");
  CREATE INDEX "_articles_v_version_version_cover_idx" ON "_articles_v" USING btree ("version_cover_id");
  CREATE INDEX "_articles_v_version_version_category_idx" ON "_articles_v" USING btree ("version_category_id");
  CREATE INDEX "_articles_v_version_version_author_idx" ON "_articles_v" USING btree ("version_author_id");
  CREATE INDEX "_articles_v_version_version_inline_image_idx" ON "_articles_v" USING btree ("version_inline_image_id");
  CREATE INDEX "_articles_v_version_version_updated_at_idx" ON "_articles_v" USING btree ("version_updated_at");
  CREATE INDEX "_articles_v_version_version_created_at_idx" ON "_articles_v" USING btree ("version_created_at");
  CREATE INDEX "_articles_v_version_version__status_idx" ON "_articles_v" USING btree ("version__status");
  CREATE INDEX "_articles_v_created_at_idx" ON "_articles_v" USING btree ("created_at");
  CREATE INDEX "_articles_v_updated_at_idx" ON "_articles_v" USING btree ("updated_at");
  CREATE INDEX "_articles_v_latest_idx" ON "_articles_v" USING btree ("latest");
  CREATE INDEX "_articles_v_rels_order_idx" ON "_articles_v_rels" USING btree ("order");
  CREATE INDEX "_articles_v_rels_parent_idx" ON "_articles_v_rels" USING btree ("parent_id");
  CREATE INDEX "_articles_v_rels_path_idx" ON "_articles_v_rels" USING btree ("path");
  CREATE INDEX "_articles_v_rels_admins_id_idx" ON "_articles_v_rels" USING btree ("admins_id");
  CREATE INDEX "properties_gallery_order_idx" ON "properties_gallery" USING btree ("_order");
  CREATE INDEX "properties_gallery_parent_id_idx" ON "properties_gallery" USING btree ("_parent_id");
  CREATE INDEX "properties_gallery_image_idx" ON "properties_gallery" USING btree ("image_id");
  CREATE INDEX "properties_features_order_idx" ON "properties_features" USING btree ("_order");
  CREATE INDEX "properties_features_parent_id_idx" ON "properties_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "properties_slug_idx" ON "properties" USING btree ("slug");
  CREATE INDEX "properties_image_idx" ON "properties" USING btree ("image_id");
  CREATE INDEX "properties_updated_at_idx" ON "properties" USING btree ("updated_at");
  CREATE INDEX "properties_created_at_idx" ON "properties" USING btree ("created_at");
  CREATE INDEX "properties__status_idx" ON "properties" USING btree ("_status");
  CREATE INDEX "properties_rels_order_idx" ON "properties_rels" USING btree ("order");
  CREATE INDEX "properties_rels_parent_idx" ON "properties_rels" USING btree ("parent_id");
  CREATE INDEX "properties_rels_path_idx" ON "properties_rels" USING btree ("path");
  CREATE INDEX "properties_rels_admins_id_idx" ON "properties_rels" USING btree ("admins_id");
  CREATE INDEX "_properties_v_version_gallery_order_idx" ON "_properties_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_properties_v_version_gallery_parent_id_idx" ON "_properties_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_properties_v_version_gallery_image_idx" ON "_properties_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "_properties_v_version_features_order_idx" ON "_properties_v_version_features" USING btree ("_order");
  CREATE INDEX "_properties_v_version_features_parent_id_idx" ON "_properties_v_version_features" USING btree ("_parent_id");
  CREATE INDEX "_properties_v_parent_idx" ON "_properties_v" USING btree ("parent_id");
  CREATE INDEX "_properties_v_version_version_slug_idx" ON "_properties_v" USING btree ("version_slug");
  CREATE INDEX "_properties_v_version_version_image_idx" ON "_properties_v" USING btree ("version_image_id");
  CREATE INDEX "_properties_v_version_version_updated_at_idx" ON "_properties_v" USING btree ("version_updated_at");
  CREATE INDEX "_properties_v_version_version_created_at_idx" ON "_properties_v" USING btree ("version_created_at");
  CREATE INDEX "_properties_v_version_version__status_idx" ON "_properties_v" USING btree ("version__status");
  CREATE INDEX "_properties_v_created_at_idx" ON "_properties_v" USING btree ("created_at");
  CREATE INDEX "_properties_v_updated_at_idx" ON "_properties_v" USING btree ("updated_at");
  CREATE INDEX "_properties_v_latest_idx" ON "_properties_v" USING btree ("latest");
  CREATE INDEX "_properties_v_rels_order_idx" ON "_properties_v_rels" USING btree ("order");
  CREATE INDEX "_properties_v_rels_parent_idx" ON "_properties_v_rels" USING btree ("parent_id");
  CREATE INDEX "_properties_v_rels_path_idx" ON "_properties_v_rels" USING btree ("path");
  CREATE INDEX "_properties_v_rels_admins_id_idx" ON "_properties_v_rels" USING btree ("admins_id");
  CREATE INDEX "developments_gallery_order_idx" ON "developments_gallery" USING btree ("_order");
  CREATE INDEX "developments_gallery_parent_id_idx" ON "developments_gallery" USING btree ("_parent_id");
  CREATE INDEX "developments_gallery_image_idx" ON "developments_gallery" USING btree ("image_id");
  CREATE INDEX "developments_typologies_order_idx" ON "developments_typologies" USING btree ("_order");
  CREATE INDEX "developments_typologies_parent_id_idx" ON "developments_typologies" USING btree ("_parent_id");
  CREATE INDEX "developments_typologies_plan_idx" ON "developments_typologies" USING btree ("plan_id");
  CREATE INDEX "developments_features_order_idx" ON "developments_features" USING btree ("_order");
  CREATE INDEX "developments_features_parent_id_idx" ON "developments_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "developments_slug_idx" ON "developments" USING btree ("slug");
  CREATE INDEX "developments_image_idx" ON "developments" USING btree ("image_id");
  CREATE INDEX "developments_updated_at_idx" ON "developments" USING btree ("updated_at");
  CREATE INDEX "developments_created_at_idx" ON "developments" USING btree ("created_at");
  CREATE INDEX "developments__status_idx" ON "developments" USING btree ("_status");
  CREATE INDEX "developments_rels_order_idx" ON "developments_rels" USING btree ("order");
  CREATE INDEX "developments_rels_parent_idx" ON "developments_rels" USING btree ("parent_id");
  CREATE INDEX "developments_rels_path_idx" ON "developments_rels" USING btree ("path");
  CREATE INDEX "developments_rels_admins_id_idx" ON "developments_rels" USING btree ("admins_id");
  CREATE INDEX "_developments_v_version_gallery_order_idx" ON "_developments_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_developments_v_version_gallery_parent_id_idx" ON "_developments_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_developments_v_version_gallery_image_idx" ON "_developments_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "_developments_v_version_typologies_order_idx" ON "_developments_v_version_typologies" USING btree ("_order");
  CREATE INDEX "_developments_v_version_typologies_parent_id_idx" ON "_developments_v_version_typologies" USING btree ("_parent_id");
  CREATE INDEX "_developments_v_version_typologies_plan_idx" ON "_developments_v_version_typologies" USING btree ("plan_id");
  CREATE INDEX "_developments_v_version_features_order_idx" ON "_developments_v_version_features" USING btree ("_order");
  CREATE INDEX "_developments_v_version_features_parent_id_idx" ON "_developments_v_version_features" USING btree ("_parent_id");
  CREATE INDEX "_developments_v_parent_idx" ON "_developments_v" USING btree ("parent_id");
  CREATE INDEX "_developments_v_version_version_slug_idx" ON "_developments_v" USING btree ("version_slug");
  CREATE INDEX "_developments_v_version_version_image_idx" ON "_developments_v" USING btree ("version_image_id");
  CREATE INDEX "_developments_v_version_version_updated_at_idx" ON "_developments_v" USING btree ("version_updated_at");
  CREATE INDEX "_developments_v_version_version_created_at_idx" ON "_developments_v" USING btree ("version_created_at");
  CREATE INDEX "_developments_v_version_version__status_idx" ON "_developments_v" USING btree ("version__status");
  CREATE INDEX "_developments_v_created_at_idx" ON "_developments_v" USING btree ("created_at");
  CREATE INDEX "_developments_v_updated_at_idx" ON "_developments_v" USING btree ("updated_at");
  CREATE INDEX "_developments_v_latest_idx" ON "_developments_v" USING btree ("latest");
  CREATE INDEX "_developments_v_rels_order_idx" ON "_developments_v_rels" USING btree ("order");
  CREATE INDEX "_developments_v_rels_parent_idx" ON "_developments_v_rels" USING btree ("parent_id");
  CREATE INDEX "_developments_v_rels_path_idx" ON "_developments_v_rels" USING btree ("path");
  CREATE INDEX "_developments_v_rels_admins_id_idx" ON "_developments_v_rels" USING btree ("admins_id");
  CREATE INDEX "leads_property_idx" ON "leads" USING btree ("property_id");
  CREATE INDEX "leads_development_idx" ON "leads" USING btree ("development_id");
  CREATE INDEX "leads_updated_at_idx" ON "leads" USING btree ("updated_at");
  CREATE INDEX "leads_created_at_idx" ON "leads" USING btree ("created_at");
  CREATE INDEX "leads_rels_order_idx" ON "leads_rels" USING btree ("order");
  CREATE INDEX "leads_rels_parent_idx" ON "leads_rels" USING btree ("parent_id");
  CREATE INDEX "leads_rels_path_idx" ON "leads_rels" USING btree ("path");
  CREATE INDEX "leads_rels_admins_id_idx" ON "leads_rels" USING btree ("admins_id");
  CREATE INDEX "_leads_v_parent_idx" ON "_leads_v" USING btree ("parent_id");
  CREATE INDEX "_leads_v_version_version_property_idx" ON "_leads_v" USING btree ("version_property_id");
  CREATE INDEX "_leads_v_version_version_development_idx" ON "_leads_v" USING btree ("version_development_id");
  CREATE INDEX "_leads_v_version_version_updated_at_idx" ON "_leads_v" USING btree ("version_updated_at");
  CREATE INDEX "_leads_v_version_version_created_at_idx" ON "_leads_v" USING btree ("version_created_at");
  CREATE INDEX "_leads_v_created_at_idx" ON "_leads_v" USING btree ("created_at");
  CREATE INDEX "_leads_v_updated_at_idx" ON "_leads_v" USING btree ("updated_at");
  CREATE INDEX "_leads_v_rels_order_idx" ON "_leads_v_rels" USING btree ("order");
  CREATE INDEX "_leads_v_rels_parent_idx" ON "_leads_v_rels" USING btree ("parent_id");
  CREATE INDEX "_leads_v_rels_path_idx" ON "_leads_v_rels" USING btree ("path");
  CREATE INDEX "_leads_v_rels_admins_id_idx" ON "_leads_v_rels" USING btree ("admins_id");
  CREATE UNIQUE INDEX "newsletter_subscribers_email_idx" ON "newsletter_subscribers" USING btree ("email");
  CREATE INDEX "newsletter_subscribers_updated_at_idx" ON "newsletter_subscribers" USING btree ("updated_at");
  CREATE INDEX "newsletter_subscribers_created_at_idx" ON "newsletter_subscribers" USING btree ("created_at");
  CREATE INDEX "newsletter_subscribers_rels_order_idx" ON "newsletter_subscribers_rels" USING btree ("order");
  CREATE INDEX "newsletter_subscribers_rels_parent_idx" ON "newsletter_subscribers_rels" USING btree ("parent_id");
  CREATE INDEX "newsletter_subscribers_rels_path_idx" ON "newsletter_subscribers_rels" USING btree ("path");
  CREATE INDEX "newsletter_subscribers_rels_admins_id_idx" ON "newsletter_subscribers_rels" USING btree ("admins_id");
  CREATE INDEX "_newsletter_subscribers_v_parent_idx" ON "_newsletter_subscribers_v" USING btree ("parent_id");
  CREATE INDEX "_newsletter_subscribers_v_version_version_email_idx" ON "_newsletter_subscribers_v" USING btree ("version_email");
  CREATE INDEX "_newsletter_subscribers_v_version_version_updated_at_idx" ON "_newsletter_subscribers_v" USING btree ("version_updated_at");
  CREATE INDEX "_newsletter_subscribers_v_version_version_created_at_idx" ON "_newsletter_subscribers_v" USING btree ("version_created_at");
  CREATE INDEX "_newsletter_subscribers_v_created_at_idx" ON "_newsletter_subscribers_v" USING btree ("created_at");
  CREATE INDEX "_newsletter_subscribers_v_updated_at_idx" ON "_newsletter_subscribers_v" USING btree ("updated_at");
  CREATE INDEX "_newsletter_subscribers_v_rels_order_idx" ON "_newsletter_subscribers_v_rels" USING btree ("order");
  CREATE INDEX "_newsletter_subscribers_v_rels_parent_idx" ON "_newsletter_subscribers_v_rels" USING btree ("parent_id");
  CREATE INDEX "_newsletter_subscribers_v_rels_path_idx" ON "_newsletter_subscribers_v_rels" USING btree ("path");
  CREATE INDEX "_newsletter_subscribers_v_rels_admins_id_idx" ON "_newsletter_subscribers_v_rels" USING btree ("admins_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_admins_id_idx" ON "payload_locked_documents_rels" USING btree ("admins_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_folders_id_idx" ON "payload_locked_documents_rels" USING btree ("folders_id");
  CREATE INDEX "payload_locked_documents_rels_tags_id_idx" ON "payload_locked_documents_rels" USING btree ("tags_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_authors_id_idx" ON "payload_locked_documents_rels" USING btree ("authors_id");
  CREATE INDEX "payload_locked_documents_rels_articles_id_idx" ON "payload_locked_documents_rels" USING btree ("articles_id");
  CREATE INDEX "payload_locked_documents_rels_properties_id_idx" ON "payload_locked_documents_rels" USING btree ("properties_id");
  CREATE INDEX "payload_locked_documents_rels_developments_id_idx" ON "payload_locked_documents_rels" USING btree ("developments_id");
  CREATE INDEX "payload_locked_documents_rels_leads_id_idx" ON "payload_locked_documents_rels" USING btree ("leads_id");
  CREATE INDEX "payload_locked_documents_rels_newsletter_subscribers_id_idx" ON "payload_locked_documents_rels" USING btree ("newsletter_subscribers_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_admins_id_idx" ON "payload_preferences_rels" USING btree ("admins_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "payload_llm_instructions_entity_slug_idx" ON "payload_llm_instructions" USING btree ("entity_slug");
  CREATE INDEX "payload_llm_instructions_updated_at_idx" ON "payload_llm_instructions" USING btree ("updated_at");
  CREATE INDEX "payload_llm_instructions_created_at_idx" ON "payload_llm_instructions" USING btree ("created_at");
  CREATE INDEX "payload_llm_instructions_rels_order_idx" ON "payload_llm_instructions_rels" USING btree ("order");
  CREATE INDEX "payload_llm_instructions_rels_parent_idx" ON "payload_llm_instructions_rels" USING btree ("parent_id");
  CREATE INDEX "payload_llm_instructions_rels_path_idx" ON "payload_llm_instructions_rels" USING btree ("path");
  CREATE INDEX "payload_llm_instructions_rels_admins_id_idx" ON "payload_llm_instructions_rels" USING btree ("admins_id");
  CREATE INDEX "brand_hero_slides_order_idx" ON "brand_hero_slides" USING btree ("_order");
  CREATE INDEX "brand_hero_slides_parent_id_idx" ON "brand_hero_slides" USING btree ("_parent_id");
  CREATE INDEX "brand_hero_slides_image_idx" ON "brand_hero_slides" USING btree ("image_id");
  CREATE INDEX "brand_hero_slides_video_idx" ON "brand_hero_slides" USING btree ("video_id");
  CREATE INDEX "brand_hero_video_idx" ON "brand" USING btree ("hero_video_id");
  CREATE INDEX "brand_consulting_image_idx" ON "brand" USING btree ("consulting_image_id");
  CREATE INDEX "brand_invest_image_idx" ON "brand" USING btree ("invest_image_id");
  CREATE INDEX "brand_sell_image_idx" ON "brand" USING btree ("sell_image_id");
  CREATE INDEX "brand_about_image_idx" ON "brand" USING btree ("about_image_id");
  CREATE INDEX "brand_rels_order_idx" ON "brand_rels" USING btree ("order");
  CREATE INDEX "brand_rels_parent_idx" ON "brand_rels" USING btree ("parent_id");
  CREATE INDEX "brand_rels_path_idx" ON "brand_rels" USING btree ("path");
  CREATE INDEX "brand_rels_admins_id_idx" ON "brand_rels" USING btree ("admins_id");
  CREATE INDEX "_brand_v_version_hero_slides_order_idx" ON "_brand_v_version_hero_slides" USING btree ("_order");
  CREATE INDEX "_brand_v_version_hero_slides_parent_id_idx" ON "_brand_v_version_hero_slides" USING btree ("_parent_id");
  CREATE INDEX "_brand_v_version_hero_slides_image_idx" ON "_brand_v_version_hero_slides" USING btree ("image_id");
  CREATE INDEX "_brand_v_version_hero_slides_video_idx" ON "_brand_v_version_hero_slides" USING btree ("video_id");
  CREATE INDEX "_brand_v_version_version_hero_video_idx" ON "_brand_v" USING btree ("version_hero_video_id");
  CREATE INDEX "_brand_v_version_version_consulting_image_idx" ON "_brand_v" USING btree ("version_consulting_image_id");
  CREATE INDEX "_brand_v_version_version_invest_image_idx" ON "_brand_v" USING btree ("version_invest_image_id");
  CREATE INDEX "_brand_v_version_version_sell_image_idx" ON "_brand_v" USING btree ("version_sell_image_id");
  CREATE INDEX "_brand_v_version_version_about_image_idx" ON "_brand_v" USING btree ("version_about_image_id");
  CREATE INDEX "_brand_v_created_at_idx" ON "_brand_v" USING btree ("created_at");
  CREATE INDEX "_brand_v_updated_at_idx" ON "_brand_v" USING btree ("updated_at");
  CREATE INDEX "_brand_v_rels_order_idx" ON "_brand_v_rels" USING btree ("order");
  CREATE INDEX "_brand_v_rels_parent_idx" ON "_brand_v_rels" USING btree ("parent_id");
  CREATE INDEX "_brand_v_rels_path_idx" ON "_brand_v_rels" USING btree ("path");
  CREATE INDEX "_brand_v_rels_admins_id_idx" ON "_brand_v_rels" USING btree ("admins_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "admins_sessions" CASCADE;
  DROP TABLE "admins" CASCADE;
  DROP TABLE "admins_rels" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_rels" CASCADE;
  DROP TABLE "_media_v" CASCADE;
  DROP TABLE "_media_v_rels" CASCADE;
  DROP TABLE "folders" CASCADE;
  DROP TABLE "folders_rels" CASCADE;
  DROP TABLE "_folders_v" CASCADE;
  DROP TABLE "_folders_v_rels" CASCADE;
  DROP TABLE "tags" CASCADE;
  DROP TABLE "tags_rels" CASCADE;
  DROP TABLE "_tags_v" CASCADE;
  DROP TABLE "_tags_v_rels" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "categories_rels" CASCADE;
  DROP TABLE "_categories_v" CASCADE;
  DROP TABLE "_categories_v_rels" CASCADE;
  DROP TABLE "authors" CASCADE;
  DROP TABLE "authors_rels" CASCADE;
  DROP TABLE "_authors_v" CASCADE;
  DROP TABLE "_authors_v_rels" CASCADE;
  DROP TABLE "articles" CASCADE;
  DROP TABLE "articles_rels" CASCADE;
  DROP TABLE "_articles_v" CASCADE;
  DROP TABLE "_articles_v_rels" CASCADE;
  DROP TABLE "properties_gallery" CASCADE;
  DROP TABLE "properties_features" CASCADE;
  DROP TABLE "properties" CASCADE;
  DROP TABLE "properties_rels" CASCADE;
  DROP TABLE "_properties_v_version_gallery" CASCADE;
  DROP TABLE "_properties_v_version_features" CASCADE;
  DROP TABLE "_properties_v" CASCADE;
  DROP TABLE "_properties_v_rels" CASCADE;
  DROP TABLE "developments_gallery" CASCADE;
  DROP TABLE "developments_typologies" CASCADE;
  DROP TABLE "developments_features" CASCADE;
  DROP TABLE "developments" CASCADE;
  DROP TABLE "developments_rels" CASCADE;
  DROP TABLE "_developments_v_version_gallery" CASCADE;
  DROP TABLE "_developments_v_version_typologies" CASCADE;
  DROP TABLE "_developments_v_version_features" CASCADE;
  DROP TABLE "_developments_v" CASCADE;
  DROP TABLE "_developments_v_rels" CASCADE;
  DROP TABLE "leads" CASCADE;
  DROP TABLE "leads_rels" CASCADE;
  DROP TABLE "_leads_v" CASCADE;
  DROP TABLE "_leads_v_rels" CASCADE;
  DROP TABLE "newsletter_subscribers" CASCADE;
  DROP TABLE "newsletter_subscribers_rels" CASCADE;
  DROP TABLE "_newsletter_subscribers_v" CASCADE;
  DROP TABLE "_newsletter_subscribers_v_rels" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "payload_llm_instructions" CASCADE;
  DROP TABLE "payload_llm_instructions_rels" CASCADE;
  DROP TABLE "brand_hero_slides" CASCADE;
  DROP TABLE "brand" CASCADE;
  DROP TABLE "brand_rels" CASCADE;
  DROP TABLE "_brand_v_version_hero_slides" CASCADE;
  DROP TABLE "_brand_v" CASCADE;
  DROP TABLE "_brand_v_rels" CASCADE;
  DROP TYPE "public"."enum_categories_tone";
  DROP TYPE "public"."enum__categories_v_version_tone";
  DROP TYPE "public"."enum_articles_format";
  DROP TYPE "public"."enum_articles_status";
  DROP TYPE "public"."enum__articles_v_version_format";
  DROP TYPE "public"."enum__articles_v_version_status";
  DROP TYPE "public"."enum_properties_segment";
  DROP TYPE "public"."enum_properties_type";
  DROP TYPE "public"."enum_properties_status";
  DROP TYPE "public"."enum__properties_v_version_segment";
  DROP TYPE "public"."enum__properties_v_version_type";
  DROP TYPE "public"."enum__properties_v_version_status";
  DROP TYPE "public"."enum_developments_launch_stage";
  DROP TYPE "public"."enum_developments_status";
  DROP TYPE "public"."enum__developments_v_version_launch_stage";
  DROP TYPE "public"."enum__developments_v_version_status";
  DROP TYPE "public"."enum_leads_intent";
  DROP TYPE "public"."enum_leads_property_type";
  DROP TYPE "public"."enum_leads_status";
  DROP TYPE "public"."enum__leads_v_version_intent";
  DROP TYPE "public"."enum__leads_v_version_property_type";
  DROP TYPE "public"."enum__leads_v_version_status";
  DROP TYPE "public"."enum_payload_llm_instructions_entity_type";
  DROP TYPE "public"."enum_brand_hero_slides_media_type";
  DROP TYPE "public"."enum__brand_v_version_hero_slides_media_type";`)
}
