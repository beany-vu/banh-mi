-- CreateTable
CREATE TABLE "User" (
	"id" TEXT NOT NULL DEFAULT gen_random_uuid (),
	"email" TEXT NOT NULL,
	"name" TEXT NOT NULL,
	"password" TEXT NOT NULL,
	CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
	"id" TEXT NOT NULL DEFAULT gen_random_uuid (),
	"user_id" TEXT NOT NULL DEFAULT '',
	"expires_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
	"id" TEXT NOT NULL DEFAULT gen_random_uuid (),
	"name" TEXT NOT NULL,
	"description" TEXT NOT NULL,
	"created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"last_update" TIMESTAMP(3) NOT NULL,
	"meta_data" JSONB,
	"user_id" TEXT NOT NULL,
	CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Translation" (
	"id" TEXT NOT NULL DEFAULT gen_random_uuid (),
	"project_id" TEXT NOT NULL,
	"locale" TEXT NOT NULL,
	"content" JSONB NOT NULL,
	"created_at" TIMESTAMP(3) NOT NULL,
	"last_update" TIMESTAMP(3) NOT NULL,
	CONSTRAINT "Translation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User" ("email");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Translation" ADD CONSTRAINT "Translation_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
