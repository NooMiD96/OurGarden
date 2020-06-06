-- Migrate PHOTO DROP
ALTER TABLE [Photo] ADD [NewsIdString] nvarchar(128) NULL;
GO

UPDATE [Photo]
    SET NewsIdString = News.Alias
FROM News
WHERE News.NewsId = Photo.NewsId
GO

DROP INDEX [IX_Photo_NewsId] ON [Photo]
GO

ALTER TABLE [Photo] DROP CONSTRAINT [FK_Photo_News_NewsId]
GO

ALTER Table [Photo]
DROP COLUMN [NewsId]
GO

EXEC sp_RENAME 'Photo.NewsIdString', 'NewsId', 'COLUMN'
GO
-- Migrate PHOTO DROP END


-- Migrate NEWS
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[News]') AND type in (N'U'))
DROP TABLE [News]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [News](
	[NewsId] [nvarchar](128) NOT NULL,
	[Alias] [nvarchar](128) NOT NULL,
	[Date] [datetime2](7) NOT NULL,
	[Description] [nvarchar](max) NOT NULL,
	[SeoDescription] [nvarchar](256) NULL,
	[SeoKeywords] [nvarchar](512) NULL,
	[SeoTitle] [nvarchar](128) NULL,
 CONSTRAINT [PK_News] PRIMARY KEY CLUSTERED 
(
	[NewsId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

SET IDENTITY_INSERT [u0740869_default].[News] ON 
GO
INSERT [u0740869_default].[News] ([NewsId], [Alias], [Date], [Description], [SeoDescription], [SeoKeywords], [SeoTitle]) VALUES (N'obrezka-i-omolojenie-ycastka', N'Обрезка и омоложение участка!', CAST(N'2019-12-24T02:25:09.6430920' AS DateTime2), N'<h3>Рады вам сообщить, что открыта запись на выезд по облагораживанию вашей территории!</h3><p>Осуществляем такие виды обрезки деревьев и кустарников:</p><ul><li>формирующая;</li><li>омолаживающая;</li><li>восстановительная;</li><li>санитарная.</li></ul><p>Сейчас наступило то самое время, когда следует задуматься о том, как сделать ваш сад максимально здоровым, плодородным и красивым.</p><h4>Звоните, и мы всё подробно вам расскажем!</h4>', NULL, NULL, NULL)
GO
INSERT [u0740869_default].[News] ([NewsId], [Alias], [Date], [Description], [SeoDescription], [SeoKeywords], [SeoTitle]) VALUES (N'zavoz-semennogo-kartofelya', N'Завоз семенного картофеля!', CAST(N'2019-12-24T12:07:46.1523901' AS DateTime2), N'<h3>Завоз семенного картофеля с 20 января!</h3><p>&nbsp;Уже сейчас вы можете выбрать полюбившиеся вам сорта картофеля, а также оформить на них предзаказ. Успей получить самые лучшие сорта по самым привлекательным ценам! Спеши, пока все не разобрали!</p>', NULL, NULL, NULL)
GO
INSERT [u0740869_default].[News] ([NewsId], [Alias], [Date], [Description], [SeoDescription], [SeoKeywords], [SeoTitle]) VALUES (N'skidka-10-pensioneram', N'Скидка 10% пенсионерам', CAST(N'2020-01-25T13:40:18.0733293' AS DateTime2), N'<p><strong>Скидка пенсионерам</strong><br>Скидка 10% пенсионерам</p>', NULL, NULL, NULL)
GO
INSERT [u0740869_default].[News] ([NewsId], [Alias], [Date], [Description], [SeoDescription], [SeoKeywords], [SeoTitle]) VALUES (N'dostavka', N'доставка', CAST(N'2020-04-20T23:55:40.7094924' AS DateTime2), N'<h3>Во время этого тяжёлого для всех нас времени, мы продолжаем работаем для вас!</h3><p>Оформите на сайте заказ или позвоните по телефону и мы доставим его до дверей бесплатно.</p><p>По любым вопросам звоните:</p><ul><li>8 950 922 39 19</li><li>8 953 43 43 516</li></ul>', NULL, NULL, NULL)
GO
SET IDENTITY_INSERT [u0740869_default].[News] OFF
GO
-- Migrate NEWS END


-- Migrate PHOTO CREATE
ALTER TABLE [Photo]  WITH CHECK ADD  CONSTRAINT [FK_Photo_News_NewsId] FOREIGN KEY([NewsId])
REFERENCES [News] ([NewsId])
GO

ALTER TABLE [Photo] CHECK CONSTRAINT [FK_Photo_News_NewsId]
GO

CREATE NONCLUSTERED INDEX [IX_Photo_NewsId] ON [Photo]
(
	[NewsId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
-- Migrate PHOTO CREATE END

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20200606120042_ChangeNewsStructure', N'3.1.4');

GO
