/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `company` to the `participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `user` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[participant] ADD [company] NVARCHAR(1000) NOT NULL,
[name] NVARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[user] ADD [token] NVARCHAR(1000) NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[user] ADD CONSTRAINT [user_token_key] UNIQUE NONCLUSTERED ([token]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
