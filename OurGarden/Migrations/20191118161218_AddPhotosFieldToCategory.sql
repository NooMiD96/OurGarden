ALTER TABLE [Photo] ADD [CategoryId] nvarchar(64) NULL;

GO

CREATE INDEX [IX_Photo_CategoryId] ON [Photo] ([CategoryId]);

GO

ALTER TABLE [Photo] ADD CONSTRAINT [FK_Photo_Category_CategoryId] FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([CategoryId]) ON DELETE NO ACTION;

GO

UPDATE [Photo]
    SET CategoryId = Category.CategoryId
FROM Category
WHERE Category.PhotoId = Photo.PhotoId

GO

ALTER TABLE [Category] DROP CONSTRAINT [FK_Category_Photo_PhotoId];

GO

DROP INDEX [IX_Category_PhotoId] ON [Category];

GO

DECLARE @var0 sysname;
SELECT @var0 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Category]') AND [c].[name] = N'PhotoId');
IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [Category] DROP CONSTRAINT [' + @var0 + '];');
ALTER TABLE [Category] DROP COLUMN [PhotoId];

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20191118161218_AddPhotosFieldToCategory', N'2.2.6-servicing-10079');

GO