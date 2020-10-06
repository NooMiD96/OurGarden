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
        const int MAX_URL_COUNT = 50_000;
        const string SITEMAPS_SUBDIRECTORY = "sitemaps";

        #region Fields

        private readonly XNamespace NS = "http://www.sitemaps.org/schemas/sitemap/0.9";

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
                .Select(x => new SiteMapSimpleItem()
                {
                    ItemType = ItemType.Category,
                    Url = WebUtils.GenerateSiteAddress(_rootOptions.HostName, $"Catalog/{x.CategoryId}"),
                    LastModified = DateTime.Now
                })
                .ToListAsync();
        }

        private async Task<IEnumerable<SiteMapSimpleItem>> GetSubcategoryItems()
        {
            return await _context
                .Subcategory
                .Select(x => new SiteMapSimpleItem()
                {
                    ItemType = ItemType.Subcategory,
                    Url = WebUtils.GenerateSiteAddress(_rootOptions.HostName, $"Catalog/{x.CategoryId}/{x.SubcategoryId}"),
                    LastModified = DateTime.Now
                })
                .ToListAsync();
        }

        private async Task<IEnumerable<SiteMapSimpleItem>> GetProductItems()
        {
            return await _context
                .Product
                .Select(x => new SiteMapSimpleItem()
                {
                    ItemType = ItemType.Subcategory,
                    Url = WebUtils.GenerateSiteAddress(_rootOptions.HostName, $"Catalog/{x.CategoryId}/{x.SubcategoryId}/{x.ProductId}"),
                    LastModified = DateTime.Now
                })
                .ToListAsync();
        }

        private async Task<IEnumerable<SiteMapSimpleItem>> GetNewsItems()
        {
            return await _context
                .News
                .Select(x => new SiteMapSimpleItem()
                {
                    ItemType = ItemType.News,
                    Url = WebUtils.GenerateSiteAddress(_rootOptions.HostName, $"News/{x.NewsId}"),
                    LastModified = DateTime.Now
                })
                .ToListAsync();
        }

        #endregion

        #region Sitemap

        #region Create Root Sitemap

        private void CreateSiteMap(IEnumerable<(string filePath, string lastMod)> filePaths)
        {
            var siteMap = new XmlDocument();
            var siteMapFilePath = Path.Join(_publicDirectory, "sitemap.xml");

            CreateMainSiteMap(siteMap, filePaths);

            siteMap.Save(siteMapFilePath);
        }

        private void CreateMainSiteMap(XmlDocument siteMap, IEnumerable<(string filePath, string lastMod)> filePaths)
        {
            var xDoc = siteMap.CreateElement("sitemapindex", NS.ToString());
            var declaration = siteMap.CreateXmlDeclaration("1.0", "utf-8", String.Empty);

            siteMap.AppendChild(declaration);
            siteMap.AppendChild(xDoc);

            foreach (var (physicalPath, lastmod) in filePaths)
            {
                var path = physicalPath.Replace(_publicDirectory, WebUtils.GenerateSiteAddress(_rootOptions.HostName)).Replace("\\", "/");

                var xSiteMap = siteMap.CreateElement("sitemap", NS.ToString());

                var xLoc = siteMap.CreateElement("loc", NS.ToString());
                var xLocText = siteMap.CreateTextNode(path);
                var xLastmod = siteMap.CreateElement("lastmod", NS.ToString());
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

        private (XmlDocument siteMap, string siteMapFilePath) CareateSubSiteMap(string fileName)
        {
            var siteMap = new XmlDocument();

            var sitemapSubdirPath = Path.Join(_publicDirectory, SITEMAPS_SUBDIRECTORY);
            if (!Directory.Exists(sitemapSubdirPath))
            {
                Directory.CreateDirectory(sitemapSubdirPath);
            }

            var siteMapFilePath = Path.Join(sitemapSubdirPath, $"{fileName}.xml");

            CreateSubSiteMap(siteMap);

            return (siteMap, siteMapFilePath);
        }

        private void CreateSubSiteMap(XmlDocument siteMap)
        {
            var rootNode = siteMap.CreateElement("urlset", NS.ToString());
            var declaration = siteMap.CreateXmlDeclaration("1.0", "utf-8", String.Empty);

            siteMap.AppendChild(declaration);
            siteMap.AppendChild(rootNode);
        }
        #endregion

        private XmlDocument OpenSitemap(string path)
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

                    (xMain, siteMapFilePath) = CareateSubSiteMap($"{filePrefix}-{fileCounter++}");

                    xDoc = xMain.DocumentElement;

                    itemCounter = 0;
                }

                var xUrl = xMain.CreateElement("url", NS.ToString());
                var xLoc = xMain.CreateElement("loc", NS.ToString());
                var xLocText = xMain.CreateTextNode(item.Url);
                var xLastmod = xMain.CreateElement("lastmod", NS.ToString());
                var xLastmodText = xMain.CreateTextNode(item.LastModified.GetDate().ToString(DateFormat));

                xDoc.AppendChild(xUrl);
                xUrl.AppendChild(xLoc);
                xLoc.AppendChild(xLocText);
                xUrl.AppendChild(xLastmod);
                xLastmod.AppendChild(xLastmodText);

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
            var prevSitemap = OpenSitemap(filePath);
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
