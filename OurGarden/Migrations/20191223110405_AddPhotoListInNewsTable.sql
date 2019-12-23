ALTER TABLE [Photo] ADD [NewsId] int NULL;

GO

UPDATE [Photo]
    SET NewsId = News.NewsId
FROM News
WHERE News.PhotoId = Photo.PhotoId

GO

ALTER TABLE [News] DROP CONSTRAINT [FK_News_Photo_PhotoId];

GO

DROP INDEX [IX_News_PhotoId] ON [News];

GO

DECLARE @var0 sysname;
SELECT @var0 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[News]') AND [c].[name] = N'PhotoId');
IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [News] DROP CONSTRAINT [' + @var0 + '];');
ALTER TABLE [News] DROP COLUMN [PhotoId];

GO

CREATE INDEX [IX_Photo_NewsId] ON [Photo] ([NewsId]);

GO

ALTER TABLE [Photo] ADD CONSTRAINT [FK_Photo_News_NewsId] FOREIGN KEY ([NewsId]) REFERENCES [News] ([NewsId]) ON DELETE NO ACTION;

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20191223110405_AddPhotoListInNewsTable', N'2.2.6-servicing-10079');

GO