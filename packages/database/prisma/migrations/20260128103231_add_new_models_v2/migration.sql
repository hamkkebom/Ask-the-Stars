/*
  Warnings:

  - The primary key for the `video_technical_specs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `video_technical_specs` table. All the data in the column will be lost.
  - You are about to drop the column `metadata` on the `video_technical_specs` table. All the data in the column will be lost.
  - You are about to drop the column `resolution` on the `video_technical_specs` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[short_id]` on the table `counselors` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `makers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[airtable_id]` on the table `videos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `counselors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filename` to the `video_technical_specs` table without a default value. This is not possible if the table is not empty.

*/
-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "vector";

-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('NEWS', 'NOTICE', 'EVENT', 'CASE_STUDY');

-- CreateEnum
CREATE TYPE "ContestStatus" AS ENUM ('UPCOMING', 'ONGOING', 'JUDGING', 'COMPLETED');

-- CreateEnum
CREATE TYPE "EntryStatus" AS ENUM ('SUBMITTED', 'SHORTLISTED', 'WINNER', 'REJECTED');

-- CreateEnum
CREATE TYPE "ResourceCategory" AS ENUM ('GUIDE', 'TEMPLATE', 'DESIGN_ASSET', 'SOUND_EFFECT', 'MUSIC', 'OTHER');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('PROJECT_ASSIGNED', 'FEEDBACK_RECEIVED', 'PAYMENT_COMPLETED', 'NEW_REQUEST', 'CONTEST_UPDATE', 'SYSTEM');

-- DropForeignKey
ALTER TABLE "videos" DROP CONSTRAINT "videos_project_id_fkey";

-- DropIndex
DROP INDEX "video_technical_specs_video_id_key";

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "channels" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "platform" TEXT DEFAULT 'youtube',
ADD COLUMN     "url" TEXT;

-- AlterTable
ALTER TABLE "counselors" ADD COLUMN     "agency_id" TEXT,
ADD COLUMN     "attended_session" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "career" TEXT,
ADD COLUMN     "category" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "display_name" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "has_rate_increase" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "increased_fee" DECIMAL(12,2),
ADD COLUMN     "introduction" TEXT,
ADD COLUMN     "is_ad_applied" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_donation" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_gift" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_kokkok" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "major_categories" TEXT[],
ADD COLUMN     "notice" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "prev_fee" DECIMAL(12,2),
ADD COLUMN     "profile_image_url" TEXT,
ADD COLUMN     "region" TEXT,
ADD COLUMN     "short_id" TEXT,
ADD COLUMN     "specialty" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "target_time_challenge" INTEGER,
ADD COLUMN     "target_time_current" INTEGER,
ADD COLUMN     "target_time_prev" INTEGER,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "waiting_time" INTEGER;

-- AlterTable
ALTER TABLE "makers" ADD COLUMN     "auth_user_id" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "role" TEXT;

-- AlterTable
ALTER TABLE "submissions" ADD COLUMN     "stream_uid" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "organization_id" TEXT;

-- AlterTable
ALTER TABLE "video_technical_specs" DROP CONSTRAINT "video_technical_specs_pkey",
DROP COLUMN "id",
DROP COLUMN "metadata",
DROP COLUMN "resolution",
ADD COLUMN     "aspect_ratio" TEXT,
ADD COLUMN     "audio_channels" INTEGER,
ADD COLUMN     "audio_codec" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "filename" TEXT NOT NULL,
ADD COLUMN     "format" TEXT,
ADD COLUMN     "fps" DOUBLE PRECISION,
ADD COLUMN     "height" INTEGER,
ADD COLUMN     "original_url" TEXT,
ADD COLUMN     "overall_bitrate" INTEGER,
ADD COLUMN     "pixel_format" TEXT,
ADD COLUMN     "r2_key_thumb_avif" TEXT,
ADD COLUMN     "r2_key_thumb_og" TEXT,
ADD COLUMN     "r2_key_thumb_webp" TEXT,
ADD COLUMN     "sample_rate" INTEGER,
ADD COLUMN     "thumbnail_alt" TEXT,
ADD COLUMN     "thumbnail_height" INTEGER,
ADD COLUMN     "thumbnail_width" INTEGER,
ADD COLUMN     "video_codec" TEXT,
ADD COLUMN     "width" INTEGER,
ADD CONSTRAINT "video_technical_specs_pkey" PRIMARY KEY ("video_id");

-- AlterTable
ALTER TABLE "videos" ADD COLUMN     "airtable_id" TEXT,
ADD COLUMN     "internal_comment" TEXT,
ADD COLUMN     "is_admin_confirmed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_revised" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "version_number" TEXT;

-- CreateTable
CREATE TABLE "courses" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "level" TEXT NOT NULL,
    "price" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "thumbnail_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modules" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "course_id" TEXT NOT NULL,

    CONSTRAINT "modules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lessons" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "content" TEXT,
    "video_r2_key" TEXT,
    "duration" INTEGER,
    "order" INTEGER NOT NULL,
    "module_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lessons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enrollments" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "enrolled_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "enrollments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "excerpt" TEXT,
    "type" "PostType" NOT NULL DEFAULT 'NEWS',
    "thumbnail_url" TEXT,
    "is_published" BOOLEAN NOT NULL DEFAULT true,
    "published_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "author_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "video_embeddings" (
    "id" TEXT NOT NULL,
    "video_id" TEXT NOT NULL,
    "embedding" vector(768) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "video_embeddings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contests" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "prize" DECIMAL(12,2) NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "status" "ContestStatus" NOT NULL DEFAULT 'UPCOMING',
    "thumbnail_url" TEXT,
    "rules" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contest_entries" (
    "id" TEXT NOT NULL,
    "contest_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "video_id" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "rank" INTEGER,
    "score" DOUBLE PRECISION,
    "status" "EntryStatus" NOT NULL DEFAULT 'SUBMITTED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contest_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portfolios" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "bio" TEXT,
    "showreel" TEXT,
    "website" TEXT,
    "social_links" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "portfolios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portfolio_items" (
    "id" TEXT NOT NULL,
    "portfolio_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "video_id" TEXT,
    "thumbnail_url" TEXT,
    "category" TEXT,
    "year" INTEGER,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "portfolio_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resources" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "category" "ResourceCategory" NOT NULL,
    "file_url" TEXT NOT NULL,
    "file_size" INTEGER,
    "file_type" TEXT,
    "download_count" INTEGER NOT NULL DEFAULT 0,
    "is_public" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "resources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "data" JSONB,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "read_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "business_number" TEXT,
    "contact_name" TEXT,
    "contact_email" TEXT,
    "contact_phone" TEXT,
    "address" TEXT,
    "logo_url" TEXT,
    "industry" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "performance_metrics" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "projects_completed" INTEGER NOT NULL DEFAULT 0,
    "projects_cancelled" INTEGER NOT NULL DEFAULT 0,
    "avg_completion_time" DOUBLE PRECISION,
    "avg_rating" DOUBLE PRECISION,
    "feedback_count" INTEGER NOT NULL DEFAULT 0,
    "revision_rate" DOUBLE PRECISION,
    "total_earnings" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "performance_metrics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "courses_slug_key" ON "courses"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "enrollments_user_id_course_id_key" ON "enrollments"("user_id", "course_id");

-- CreateIndex
CREATE UNIQUE INDEX "posts_slug_key" ON "posts"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "video_embeddings_video_id_key" ON "video_embeddings"("video_id");

-- CreateIndex
CREATE UNIQUE INDEX "contest_entries_contest_id_user_id_key" ON "contest_entries"("contest_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "portfolios_user_id_key" ON "portfolios"("user_id");

-- CreateIndex
CREATE INDEX "notifications_user_id_is_read_idx" ON "notifications"("user_id", "is_read");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_business_number_key" ON "organizations"("business_number");

-- CreateIndex
CREATE UNIQUE INDEX "performance_metrics_user_id_period_key" ON "performance_metrics"("user_id", "period");

-- CreateIndex
CREATE UNIQUE INDEX "counselors_short_id_key" ON "counselors"("short_id");

-- CreateIndex
CREATE UNIQUE INDEX "makers_name_key" ON "makers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "videos_airtable_id_key" ON "videos"("airtable_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "videos" ADD CONSTRAINT "videos_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "counselors" ADD CONSTRAINT "counselors_agency_id_fkey" FOREIGN KEY ("agency_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modules" ADD CONSTRAINT "modules_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "modules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video_embeddings" ADD CONSTRAINT "video_embeddings_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "videos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contest_entries" ADD CONSTRAINT "contest_entries_contest_id_fkey" FOREIGN KEY ("contest_id") REFERENCES "contests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contest_entries" ADD CONSTRAINT "contest_entries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolios" ADD CONSTRAINT "portfolios_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolio_items" ADD CONSTRAINT "portfolio_items_portfolio_id_fkey" FOREIGN KEY ("portfolio_id") REFERENCES "portfolios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "performance_metrics" ADD CONSTRAINT "performance_metrics_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
