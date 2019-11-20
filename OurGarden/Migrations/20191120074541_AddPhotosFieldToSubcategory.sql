ALTER TABLE [Photo] ADD [SubcategoryId] nvarchar(64) NULL;

GO

ALTER TABLE [Photo] ADD [SubcategoryCategoryId] nvarchar(64) NULL;

GO

CREATE INDEX [IX_Photo_SubcategoryId_SubcategoryCategoryId] ON [Photo] ([SubcategoryId], [SubcategoryCategoryId]);

GO

ALTER TABLE [Photo] ADD CONSTRAINT [FK_Photo_Subcategory_SubcategoryId_SubcategoryCategoryId] FOREIGN KEY ([SubcategoryId], [SubcategoryCategoryId]) REFERENCES [Subcategory] ([SubcategoryId], [CategoryId]) ON DELETE NO ACTION;

GO

UPDATE [Photo]
    SET SubcategoryId = Subcategory.SubcategoryId
    , SubcategoryCategoryId = Subcategory.CategoryId
FROM Subcategory
WHERE Subcategory.PhotoId = Photo.PhotoId

GO

ALTER TABLE [Subcategory] DROP CONSTRAINT [FK_Subcategory_Photo_PhotoId];

GO

DROP INDEX [IX_Subcategory_PhotoId] ON [Subcategory];

GO

DECLARE @var0 sysname;
SELECT @var0 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Subcategory]') AND [c].[name] = N'PhotoId');
IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [Subcategory] DROP CONSTRAINT [' + @var0 + '];');
ALTER TABLE [Subcategory] DROP COLUMN [PhotoId];

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20191120074541_AddPhotosFieldToSubcategory', N'2.2.6-servicing-10079');

GO