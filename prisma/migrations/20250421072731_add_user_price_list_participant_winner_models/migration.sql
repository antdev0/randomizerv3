BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[price_list] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [type] NVARCHAR(1000) NOT NULL,
    [quantity] INT NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [price_list_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL CONSTRAINT [price_list_updated_at_df] DEFAULT CURRENT_TIMESTAMP,
    [user_id] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [price_list_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[participant] (
    [id] NVARCHAR(1000) NOT NULL,
    [participant_id] NVARCHAR(1000) NOT NULL,
    [entries] INT NOT NULL,
    [type] NVARCHAR(1000) NOT NULL,
    [user_id] NVARCHAR(1000) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [participant_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL CONSTRAINT [participant_updated_at_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [participant_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[winner] (
    [id] NVARCHAR(1000) NOT NULL,
    [participant_id] NVARCHAR(1000) NOT NULL,
    [price_list_id] NVARCHAR(1000) NOT NULL,
    [user_id] NVARCHAR(1000) NOT NULL,
    [type] NVARCHAR(1000) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [winner_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL CONSTRAINT [winner_updated_at_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [winner_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[price_list] ADD CONSTRAINT [price_list_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[user]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[participant] ADD CONSTRAINT [participant_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[user]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[winner] ADD CONSTRAINT [winner_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[user]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[winner] ADD CONSTRAINT [winner_price_list_id_fkey] FOREIGN KEY ([price_list_id]) REFERENCES [dbo].[price_list]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[winner] ADD CONSTRAINT [winner_participant_id_fkey] FOREIGN KEY ([participant_id]) REFERENCES [dbo].[participant]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
