/*
  Warnings:

  - You are about to drop the column `price_list_id` on the `winner` table. All the data in the column will be lost.
  - You are about to drop the `price_list` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `prize_list_id` to the `winner` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[price_list] DROP CONSTRAINT [price_list_user_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[winner] DROP CONSTRAINT [winner_price_list_id_fkey];

-- AlterTable
ALTER TABLE [dbo].[winner] DROP COLUMN [price_list_id];
ALTER TABLE [dbo].[winner] ADD [prize_list_id] NVARCHAR(1000) NOT NULL;

-- DropTable
DROP TABLE [dbo].[price_list];

-- CreateTable
CREATE TABLE [dbo].[prize_list] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [type] NVARCHAR(1000) NOT NULL,
    [image] NVARCHAR(1000) NOT NULL,
    [quantity] INT NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [prize_list_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL CONSTRAINT [prize_list_updated_at_df] DEFAULT CURRENT_TIMESTAMP,
    [user_id] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [prize_list_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[prize_list] ADD CONSTRAINT [prize_list_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[user]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[winner] ADD CONSTRAINT [winner_prize_list_id_fkey] FOREIGN KEY ([prize_list_id]) REFERENCES [dbo].[prize_list]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
