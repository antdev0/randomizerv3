/*
  Warnings:

  - You are about to drop the column `participant_id` on the `winner` table. All the data in the column will be lost.
  - Added the required column `company` to the `winner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `winner` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[winner] DROP CONSTRAINT [winner_participant_id_fkey];

-- AlterTable
ALTER TABLE [dbo].[winner] DROP COLUMN [participant_id];
ALTER TABLE [dbo].[winner] ADD [company] NVARCHAR(1000) NOT NULL,
[name] NVARCHAR(1000) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
