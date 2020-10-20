using Core.Utils;

using DataBase.Abstraction.Repositories;
using DataBase.Context;
using DataBase.Repository;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

using Model;

using SiteMapHostService.Abstraction;
using SiteMapHostService.Abstraction.Model;

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Linq;

using static Core.Helpers.DateTimeHelper;

namespace SiteMapHostService
{
    public class SiteMapBuilder : ISiteMapBuilder
    {
        #region CONST

        /// <summary>
        /// Максимальное кол-во ссылок в одном файле
        /// </summary>
        const int MAX_URL_COUNT = 50_000;

        /// <summary>
        /// Папка в которой будут лежать карты сайта
        /// </summary>
        const string SITEMAPS_SUBDIRECTORY = "sitemaps";

        #endregion

        #region Fields

        /// <summary>
        /// Ссылка на NS для ссылок сайта
        /// </summary>
        private readonly XNamespace siteUrlNS = "http://www.sitemaps.org/schemas/sitemap/0.9";

        /// <summary>
        /// Ссылка на NS для изображений сайта
        /// </summary>
        private readonly XNamespace siteImageNS = "http://www.google.com/schemas/sitemap-image/1.1";

        private readonly RootOptions _rootOptions;

        private readonly OurGardenContext _context;

        private readonly string _publicDirectory;

        #endregion

        #region .ctor

        /// <summary>
        /// .ctor
        /// </summary>
        public SiteMapBuilder(IOptions<RootOptions> rootOptions,
                              IOurGardenRepository context)
        {
            _rootOptions = rootOptions.Value;
            _context = (context as OurGardenRepository).Context;
            _publicDirectory = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
        }

        #endregion

        /// <inheritdoc/>
        public async Task CreateSiteMap()
        {
            var categoryItems = await GetCategoryItems();
            var subcategoryItems = await GetSubcategoryItems();
            var productItems = await GetProductItems();
            var newsItems = await GetNewsItems();

            var filePaths = new List<(string filePath, string lastMod)>();

            filePaths.AddRange(UpdateCategoryItems(categoryItems));
            filePaths.AddRange(UpdateSubategoryItems(subcategoryItems));
            filePaths.AddRange(UpdateProductItems(productItems));
            filePaths.AddRange(UpdateNewsItems(newsItems));

            CreateSiteMap(filePaths);
        }

        // TODO:? Получать реальную дату модификации
        #region Get Data From Database

        private async Task<IEnumerable<SiteMapSimpleItem>> GetCategoryItems()
        {
            return await _context
                .Category
                .Include(x => x.Photos)
                .Select(x => new SiteMapSimpleItem()
                {
                    Url = $"Catalog/{x.CategoryId}",
                    LastModified = DateTime.Now,
                    Name = x.Alias,
                    ItemType = ItemType.Category,
                    Photos = x.Photos,
                })
                .ToListAsync();
        }

        private async Task<IEnumerable<SiteMapSimpleItem>> GetSubcategoryItems()
        {
            return await _context
                .Subcategory
                .Include(x => x.Photos)
                .Select(x => new SiteMapSimpleItem()
                {
                    Url = $"Catalog/{x.CategoryId}/{x.SubcategoryId}",
                    LastModified = DateTime.Now,
                    Name = x.Alias,
                    ItemType = ItemType.Subcategory,
                    Photos = x.Photos,
                })
                .ToListAsync();
        }

        private async Task<IEnumerable<SiteMapSimpleItem>> GetProductItems()
        {
            return await _context
                .Product
                .Include(x => x.Photos)
                .Select(x => new SiteMapSimpleItem()
                {
                    Url = $"Catalog/{x.CategoryId}/{x.SubcategoryId}/{x.ProductId}",
                    LastModified = DateTime.Now,
                    Name = x.Alias,
                    ItemType = ItemType.Subcategory,
                    Photos = x.Photos,
                })
                .ToListAsync();
        }

        private async Task<IEnumerable<SiteMapSimpleItem>> GetNewsItems()
        {
            return await _context
                .News
                .Include(x => x.Photos)
                .Select(x => new SiteMapSimpleItem()
                {
                    Url = $"News/{x.NewsId}",
                    LastModified = DateTime.Now,
                    Name = x.Alias,
                    ItemType = ItemType.News,
                    Photos = x.Photos,
                })
                .ToListAsync();
        }

        #endregion

        #region Sitemap

        #region Create Root Sitemap

        /// <summary>
        /// Создаёт карту сайта для переданных файлов.
        /// </summary>
        /// <param name="filePaths"></param>
        private void CreateSiteMap(IEnumerable<(string filePath, string lastMod)> filePaths)
        {
            var siteMap = new XmlDocument();
            var siteMapFilePath = Path.Join(_publicDirectory, "sitemap.xml");

            CreateMainSiteMap(siteMap, filePaths);

            siteMap.Save(siteMapFilePath);
        }

        /// <summary>
        /// Создание рутовой карты сайта, которая содержит ссылки на остальные.
        /// Остальные карты на момент вызова уже созданы.
        /// </summary>
        private void CreateMainSiteMap(XmlDocument siteMap, IEnumerable<(string filePath, string lastMod)> filePaths)
        {
            var xDoc = siteMap.CreateElement("sitemapindex", siteUrlNS.ToString());
            var declaration = siteMap.CreateXmlDeclaration("1.0", "utf-8", String.Empty);

            siteMap.AppendChild(declaration);
            siteMap.AppendChild(xDoc);

            foreach (var (physicalPath, lastmod) in filePaths)
            {
                var path = physicalPath.Replace(_publicDirectory, WebUtils.GenerateSiteAddress(_rootOptions.HostName)).Replace("\\", "/");

                var xSiteMap = siteMap.CreateElement("sitemap", siteUrlNS.ToString());

                var xLoc = siteMap.CreateElement("loc", siteUrlNS.ToString());
                var xLocText = siteMap.CreateTextNode(path);
                var xLastmod = siteMap.CreateElement("lastmod", siteUrlNS.ToString());
                var xLastmodText = siteMap.CreateTextNode(lastmod);

                xDoc.AppendChild(xSiteMap);
                xSiteMap.AppendChild(xLoc);
                xLoc.AppendChild(xLocText);
                xSiteMap.AppendChild(xLastmod);
                xLastmod.AppendChild(xLastmodText);
            }
        }

        #endregion

        #region Create Sub Sitemap

        /// <summary>
        /// Создаёт файл карты сайта для раздела.
        /// </summary>
        /// <param name="fileName">Путь куда сохраниться карта.</param>
        private (XmlDocument siteMap, string siteMapFilePath) CreateSubSiteMap(string fileName)
        {
            var siteMap = new XmlDocument();

            var sitemapSubdirPath = Path.Join(_publicDirectory, SITEMAPS_SUBDIRECTORY);
            if (!Directory.Exists(sitemapSubdirPath))
            {
                Directory.CreateDirectory(sitemapSubdirPath);
            }

            var siteMapFilePath = Path.Join(sitemapSubdirPath, $"{fileName}.xml");

            InitSubSiteMap(siteMap);

            return (siteMap, siteMapFilePath);
        }

        /// <summary>
        /// Создаёт в xml файле основную часть карты сайта.
        /// </summary>
        private void InitSubSiteMap(XmlDocument siteMap)
        {
            var rootNode = siteMap.CreateElement("urlset", siteUrlNS.ToString());
            var declaration = siteMap.CreateXmlDeclaration("1.0", "utf-8", String.Empty);

            siteMap.AppendChild(declaration);
            siteMap.AppendChild(rootNode);
        }
        #endregion

        /// <summary>
        /// Открытие xml файл.
        /// </summary>
        private XmlDocument OpenXML(string path)
        {
            if (!File.Exists(path))
            {
                return null;
            }

            var xMain = new XmlDocument();
            xMain.Load(path);

            return xMain;
        }

        #endregion

        #region UpdateSiteMap

        private IEnumerable<(string filePath, string lastMod)> UpdateCategoryItems(IEnumerable<SiteMapSimpleItem> items)
        {
            const string identifier = "category";

            return UpdateItems(identifier, items);
        }

        private IEnumerable<(string filePath, string lastMod)> UpdateSubategoryItems(IEnumerable<SiteMapSimpleItem> items)
        {
            const string identifier = "subcategory";

            return UpdateItems(identifier, items);
        }

        private IEnumerable<(string filePath, string lastMod)> UpdateProductItems(IEnumerable<SiteMapSimpleItem> items)
        {
            const string identifier = "product";

            return UpdateItems(identifier, items);
        }

        private IEnumerable<(string filePath, string lastMod)> UpdateNewsItems(IEnumerable<SiteMapSimpleItem> items)
        {
            const string identifier = "news";

            return UpdateItems(identifier, items);
        }

        private IEnumerable<(string filePath, string lastMod)> UpdateItems(string filePrefix, IEnumerable<SiteMapSimpleItem> items)
        {
            const int max_item_diff = 2;

            var fileList = new List<(string filePath, string lastMod)>();

            var fileCounter = 1;
            var itemCounter = MAX_URL_COUNT;
            XmlDocument xMain = default;
            XmlElement xDoc = default;
            string siteMapFilePath = default;
            string lastmod;

            foreach (var item in items)
            {
                if (itemCounter + max_item_diff >= MAX_URL_COUNT)
                {
                    if (xMain != null && !String.IsNullOrEmpty(siteMapFilePath))
                    {
                        lastmod = GetLastmodSitemap(xMain, siteMapFilePath, items.Skip((fileCounter - 1) * (MAX_URL_COUNT - max_item_diff))
                                                                                 .Take(itemCounter));

                        xMain.Save(siteMapFilePath);

                        fileList.Add((siteMapFilePath, lastmod));
                    }

                    (xMain, siteMapFilePath) = CreateSubSiteMap($"{filePrefix}-{fileCounter++}");

                    xDoc = xMain.DocumentElement;

                    itemCounter = 0;
                }

                var xUrl = xMain.CreateElement("url", siteUrlNS.ToString());
                xDoc.AppendChild(xUrl);

                var xUrlLoc = xMain.CreateElement("loc", siteUrlNS.ToString());
                xUrl.AppendChild(xUrlLoc);
                var xUrlLocText = xMain.CreateTextNode(WebUtils.GenerateSiteAddress(_rootOptions.HostName, item.Url));
                xUrlLoc.AppendChild(xUrlLocText);

                var xUrlLastmod = xMain.CreateElement("lastmod", siteUrlNS.ToString());
                xUrl.AppendChild(xUrlLastmod);
                var xUrlLastmodText = xMain.CreateTextNode(item.LastModified.GetDate().ToString(DateFormat));
                xUrlLastmod.AppendChild(xUrlLastmodText);

                if (item.Photos != null)
                {
                    foreach (var photo in item.Photos)
                    {
                        var xImage = xMain.CreateElement("image", siteImageNS.ToString());
                        xUrl.AppendChild(xImage);

                        var xImageLoc = xMain.CreateElement("loc", siteImageNS.ToString());
                        xImage.AppendChild(xImageLoc);

                        var xImageLocText = xMain.CreateTextNode(WebUtils.GenerateSiteAddress(_rootOptions.HostName, photo.Url));
                        xImageLoc.AppendChild(xImageLocText);

                        var xImageTitle = xMain.CreateElement("title", siteImageNS.ToString());
                        xImage.AppendChild(xImageTitle);

                        var xImageTitleText = xMain.CreateTextNode(item.Name);
                        xImageTitle.AppendChild(xImageTitleText);
                    }
                }

                itemCounter++;
            }

            if (xMain != null && !String.IsNullOrEmpty(siteMapFilePath))
            {
                lastmod = GetLastmodSitemap(xMain, siteMapFilePath, items.Skip((fileCounter - 1) * (MAX_URL_COUNT - max_item_diff))
                                                                         .Take(itemCounter));

                xMain.Save(siteMapFilePath);

                fileList.Add((siteMapFilePath, lastmod));
            }

            return fileList;
        }

        private string GetLastmodSitemap(XmlDocument xMain, string filePath, IEnumerable<SiteMapSimpleItem> items)
        {
            var prevSitemap = OpenXML(filePath);
            DateTime lastmod = default;

            if (prevSitemap != null && items.Any() && prevSitemap.InnerXml.Equals(xMain.InnerXml))
            {
                lastmod = items.Max(x => x.LastModified);
            }
            else
            {
                lastmod = DateTime.Now;
            }

            return lastmod.GetDate().ToString(DateFormat);
        }

        #endregion
    }
}
