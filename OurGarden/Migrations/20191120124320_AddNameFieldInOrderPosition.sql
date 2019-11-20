DECLARE @var0 sysname;
SELECT @var0 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Photo]') AND [c].[name] = N'Url');
IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [Photo] DROP CONSTRAINT [' + @var0 + '];');
ALTER TABLE [Photo] ALTER COLUMN [Url] nvarchar(128) NOT NULL;

GO

DECLARE @var1 sysname;
SELECT @var1 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Photo]') AND [c].[name] = N'PreviewUrl');
IF @var1 IS NOT NULL EXEC(N'ALTER TABLE [Photo] DROP CONSTRAINT [' + @var1 + '];');
ALTER TABLE [Photo] ALTER COLUMN [PreviewUrl] nvarchar(128) NULL;

GO

ALTER TABLE [OrderPosition] ADD [Name] nvarchar(128) NOT NULL DEFAULT N'';

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20191120124320_AddNameFieldInOrderPosition', N'2.2.6-servicing-10079');

GO