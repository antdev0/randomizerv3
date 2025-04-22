/*
  Warnings:

  - You are about to drop the column `participant_id` on the `participant` table. All the data in the column will be lost.
  - Added the required column `image` to the `price_list` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[participant] DROP COLUMN [participant_id];

-- AlterTable
ALTER TABLE [dbo].[price_list] ADD [image] NVARCHAR(1000) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
