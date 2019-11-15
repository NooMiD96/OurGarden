using Core.Helpers;

using Database.Contexts;

using Microsoft.EntityFrameworkCore;

using Model.Breadcrumb;
using Model.DB;
using Model.DTO;
using Model.DTO.ProductDTO;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Database.Repositories
{
    public partial class OurGardenRepository : IOurGardenRepository
    {
        public readonly OurGardenContext _context;
        public OurGardenRepository(OurGardenContext context)
        {
            _context = context;
        }

        #region Category
        private const string __category_alredy_exist = "Не удалось {0} категорию с наименованием \"{1}\" поскольку уже существует категория с наименованием \"{2}\".";

        public async Task<IEnumerable<Category>> GetCategories(bool isGetOnlyVisible = false) =>
            await GetCategoryImpl(isGetOnlyVisible: isGetOnlyVisible);

        public async Task<Category> GetCategory(string categoryId) =>
            (
                await GetCategoryImpl(categoryId: categoryId)
            )
            .FirstOrDefault();

        public async Task<IEnumerable<CategoryDictionaryDTO>> GetSimpleCategories(bool includeSubcategory = false)
        {
            IQueryable<CategoryDictionaryDTO> query;

            if (includeSubcategory)
            {
                query = _context
                    .Category
                    .Select(cat => new CategoryDictionaryDTO()
                    {
                        CategoryId = cat.CategoryId,
                        Alias = cat.Alias,
                        Subcategories = cat.Subcategories.Select(sub => new SubcategoryDictionaryDTO()
                        {
                            SubcategoryId = sub.SubcategoryId,
                            Alias = sub.Alias,
                        })
                    })
                    .AsQueryable();
            }
            else
            {
                query = _context
                    .Category
                    .Select(cat => new CategoryDictionaryDTO()
                    {
                        CategoryId = cat.CategoryId,
                        Alias = cat.Alias
                    })
                    .AsQueryable();
            }

            return await query.ToListAsync();
        }

        public async ValueTask<(bool isSuccess, string error)> AddCategory(Category category)
        {
            const string crudName = "добавить";

            var (isSuccess, error, findedEntity) = await AddNewEntityImpl(category);
            if (!isSuccess && error == __entity_alredy_exists)
            {
                error = String.Format(
                    __category_alredy_exist,
                    crudName,
                    category.Alias,
                    findedEntity.Alias
                );
            }

            return (isSuccess, error);
        }

        public async ValueTask<(bool isSuccess, string error)> UpdateCategory(Category category)
        {
            var result = await UpdateEntityImpl(category);

            return result;
        }

        public async Task DeleteCategory(string categoryId)
        {
            var category = await _context.Category.FirstOrDefaultAsync(x => x.CategoryId == categoryId);
            if (category == null)
                return;
            _context.Category.Remove(category);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCategory(Category category)
        {
            _context.Category.Remove(category);
            await _context.SaveChangesAsync();
        }
        #endregion

        #region Client
        public async Task<IEnumerable<Client>> GetClients()
        {
            return await _context.Clients.ToListAsync();
        }

        public async Task<Client> GetClient(int clientId)
        {
            return await _context.Clients.FirstOrDefaultAsync(x => x.ClientId == clientId);
        }

        public async Task AddClient(Client client)
        {
            if (!_context.Clients.Any(x => x.Email == client.Email))
            {
                await _context.Clients.AddAsync(client);
                await _context.SaveChangesAsync();
            }
        }

        public async Task UpdateClient(Client client)
        {
            _context.Clients.Update(client);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteClient(int clientId)
        {
            var client = await _context.Clients.FirstOrDefaultAsync(x => x.ClientId == clientId);
            if (client == null)
                return;

            _context.Clients.Remove(client);
            await _context.SaveChangesAsync();
        }

        #endregion

        #region Subcategory
        private const string __subcategory_alredy_exist = "Не удалось {0} подкатегорию с выбранной категорией \"{1}\" и наименованием \"{2}\" поскольку уже существует подкатегория с наименованием \"{3}\".";

        public async Task<IEnumerable<Subcategory>> GetSubcategories(bool isGetOnlyVisible = false) =>
            await GetSubcategoriesImpl(isGetOnlyVisible: isGetOnlyVisible);

        public async Task<IEnumerable<Subcategory>> GetSubcategories(string categoryId, bool isGetOnlyVisible = false) =>
            await GetSubcategoriesImpl(categoryId: categoryId, isGetOnlyVisible: isGetOnlyVisible);

        public async Task<Subcategory> GetSubcategory(string categoryId, string subcategoryId) =>
            (
                await GetSubcategoriesImpl(categoryId: categoryId, subcategoryId: subcategoryId)
            )
            .FirstOrDefault();

        public async Task<List<Breadcrumb>> GetSubcategoryBreadcrumb(string categoryId)
        {
            categoryId = categoryId.TransformToId();

            var result = new List<Breadcrumb>();

            var category = await _context.Category
                .Select(x => new
                {
                    x.CategoryId,
                    x.Alias
                })
                .FirstOrDefaultAsync(x => x.CategoryId == categoryId);

            if (category is null)
                return result;

            result.Add(new Breadcrumb()
            {
                DisplayName = category.Alias,
                Url = $"Catalog/{category.CategoryId}",
            });

            return result;
        }

        public async ValueTask<(bool isSuccess, string error)> AddSubcategory(Subcategory subcategory)
        {
            const string crudName = "добавить";

            var (isSuccess, error, findedEntity) = await AddNewEntityImpl(subcategory);
            if (!isSuccess && error == __entity_alredy_exists)
            {
                if (findedEntity.Category is null)
                {
                    await _context.Entry(findedEntity)
                        .Reference(x => x.Category)
                        .LoadAsync();
                }

                error = String.Format(
                    __subcategory_alredy_exist,
                    crudName,
                    findedEntity.Category.Alias,
                    subcategory.Alias,
                    findedEntity.Alias
                );
            }

            return (isSuccess, error);
        }

        public async ValueTask<(bool isSuccess, string error)> UpdateSubcategory(Subcategory subcategory)
        {
            var result = await UpdateEntityImpl(subcategory);

            return result;
        }

        public async Task DeleteSubcategory(string categoryId, string subcategoryId)
        {
            var subcategory = await _context.Subcategory
                .FirstOrDefaultAsync(x => x.SubcategoryId == subcategoryId && x.CategoryId == categoryId);
            if (subcategory == null)
                return;
            _context.Subcategory.Remove(subcategory);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteSubcategory(Subcategory subcategory)
        {
            _context.Subcategory.Remove(subcategory);
            await _context.SaveChangesAsync();
        }

        #endregion

        #region Product
        private const string __product_alredy_exist = "Не удалось {0} продукт с выбранной категорией \"{1}\", подкатегорией \"{2}\" и наименованием \"{3}\" поскольку уже существует продукт с наименованием \"{4}\".";

        public async Task<IEnumerable<Product>> GetProducts() => await GetProductsImpl();

        public async Task<IEnumerable<Product>> GetProducts(string categoryId, string subcategoryId, bool isGetOnlyVisible = false) =>
            await GetProductsImpl(categoryId: categoryId, subcategoryId: subcategoryId, isGetOnlyVisible: isGetOnlyVisible);

        public async Task<Product> GetProduct(string categoryId, string subcategoryId, string productId) =>
            (
                await GetProductsImpl(productId: productId, categoryId: categoryId, subcategoryId: subcategoryId)
            )
            .FirstOrDefault();

        public async Task<List<Breadcrumb>> GetProductBreadcrumb(string categoryId, string subcategoryId)
        {
            categoryId = categoryId.TransformToId();
            subcategoryId = subcategoryId.TransformToId();

            var result = new List<Breadcrumb>();

            var subcategory = await _context.Subcategory
                .Select(x => new
                {
                    CategoryAlias = x.Category.Alias,
                    x.Category.CategoryId,
                    x.SubcategoryId,
                    x.Alias
                })
                .FirstOrDefaultAsync(x => x.CategoryId == categoryId && x.SubcategoryId == subcategoryId);

            if (subcategory is null)
                return result;

            result.Add(new Breadcrumb()
            {
                DisplayName = subcategory.CategoryAlias,
                Url = $"Catalog/{subcategory.CategoryId}"
            });

            result.Add(new Breadcrumb()
            {
                DisplayName = subcategory.Alias,
                Url = $"Catalog/{subcategory.CategoryId}/{subcategory.SubcategoryId}"
            });

            return result;
        }

        public async Task<List<Breadcrumb>> GetProductBreadcrumb(string categoryId, string subcategoryId, string productId)
        {
            categoryId = categoryId.TransformToId();
            subcategoryId = subcategoryId.TransformToId();
            productId = productId.TransformToId();

            var result = new List<Breadcrumb>();

            var product = await _context.Product
                .Select(x => new
                {
                    CategoryAlias = x.Subcategory.Category.Alias,
                    x.Subcategory.Category.CategoryId,
                    SubcategoryAlias = x.Subcategory.Alias,
                    x.Subcategory.SubcategoryId,
                    x.ProductId,
                    x.Alias
                })
                .FirstOrDefaultAsync(x => x.CategoryId == categoryId
                                          && x.SubcategoryId == subcategoryId
                                          && x.ProductId == productId);

            if (product is null)
                return result;

            result.Add(new Breadcrumb()
            {
                DisplayName = product.CategoryAlias,
                Url = $"Catalog/{product.CategoryId}"
            });

            result.Add(new Breadcrumb()
            {
                DisplayName = product.SubcategoryAlias,
                Url = $"Catalog/{product.CategoryId}/{product.SubcategoryId}"
            });

            result.Add(new Breadcrumb()
            {
                DisplayName = product.Alias,
                Url = $"Catalog/{product.CategoryId}/{product.SubcategoryId}/{product.ProductId}"
            });

            return result;
        }

        public async ValueTask<(bool isSuccess, string error)> AddProduct(Product product)
        {
            const string crudName = "добавить";

            var (isSuccess, error, findedEntity) = await AddNewEntityImpl(product);
            if (!isSuccess && error == __entity_alredy_exists)
            {
                if (findedEntity.Subcategory is null)
                {
                    await _context.Entry(findedEntity)
                        .Reference(x => x.Subcategory)
                        .LoadAsync();
                }

                if (findedEntity.Subcategory.Category is null)
                {
                    await _context.Entry(findedEntity.Subcategory)
                        .Reference(x => x.Category)
                        .LoadAsync();
                }

                error = String.Format(
                    __product_alredy_exist,
                    crudName,
                    findedEntity.Subcategory.Category.Alias,
                    findedEntity.Subcategory.Alias,
                    product.Alias,
                    findedEntity.Alias
                );
            }

            return (isSuccess, error);
        }

        public async ValueTask<(bool isSuccess, string error)> UpdateProduct(Product product)
        {
            var result = await UpdateEntityImpl(product);

            return result;
        }

        public async ValueTask<bool> DeleteProduct(string categoryId, string subcategoryId, string productId)
        {
            var product = await _context
                .Product
                .FirstOrDefaultAsync(x => x.ProductId == productId && x.SubcategoryId == subcategoryId && x.CategoryId == categoryId);

            if (product == null)
                return false;

            _context.Product.Remove(product);
            await _context.SaveChangesAsync();

            return true;
        }

        public async ValueTask<bool> DeleteProduct(Product product)
        {
            _context.Product.Remove(product);
            await _context.SaveChangesAsync();

            return true;
        }

        #endregion

        #region News
        public async Task<IEnumerable<News>> GetNews(bool includeDescriptions = true) =>
            await GetNewsImpl(includeDescriptions: includeDescriptions);

        public async Task<News> GetNews(int newsId) =>
            (
                await GetNewsImpl(newsId: newsId)
            )
            .FirstOrDefault();

        public async Task<News> GetNews(string alias, bool includeDescriptions = true) =>
            (
                await GetNewsImpl(alias: alias, includeDescriptions: includeDescriptions)
            )
            .FirstOrDefault();

        public async Task<List<Breadcrumb>> GetNewsBreadcrumb(string alias)
        {
            alias = alias.TransformToId();

            var result = new List<Breadcrumb>();

            var news = await _context.News
                .Select(x => new
                {
                    x.Alias,
                    x.Title,
                })
                .FirstOrDefaultAsync(x => x.Alias == alias);

            if (news is null)
                return result;

            result.Add(new Breadcrumb()
            {
                DisplayName = news.Title,
                Url = $"News/{news.Alias}",
            });

            return result;
        }

        public async Task<bool> CheckNewsAlias(string alias) =>
            await _context.News.AnyAsync(x => x.Alias == alias);

        public async Task AddNews(News news)
        {
            var chek = await _context.News.FirstOrDefaultAsync(x => x.NewsId == news.NewsId);
            if (chek != null)
            {
                throw new Exception();
            }
            await _context.News.AddAsync(news);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateNews(News news)
        {
            _context.News.Update(news);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteNews(int newsId)
        {
            var news = await _context.News.FirstOrDefaultAsync(x => x.NewsId == newsId);
            if (news == null)
                return;
            _context.News.Remove(news);
            await _context.SaveChangesAsync();
        }

        public async ValueTask<bool> DeleteNews(News news)
        {
            _context.News.Remove(news);

            await _context.SaveChangesAsync();

            return true;
        }

        #endregion

        #region Gallery
        public async Task<IEnumerable<Gallery>> GetGalleries() =>
            await _context.Gallery
            .Include(x => x.Photos)
            .ToListAsync();

        public async Task<Gallery> GetGallery(int galleryId) =>
            await _context.Gallery
            .Include(x => x.Photos)
            .FirstOrDefaultAsync(x => x.GalleryId == galleryId);

        public async Task AddGallery(Gallery gallery)
        {
            var chek = await _context.Gallery.FirstOrDefaultAsync(x => x.GalleryId == gallery.GalleryId);
            if (chek != null)
            {
                throw new Exception();
            }
            await _context.Gallery.AddAsync(gallery);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateGallery(Gallery gallery)
        {
            _context.Gallery.Update(gallery);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteGallery(int galleryId)
        {
            var gallery = await _context.Gallery
                .Include(x => x.Photos)
                .FirstOrDefaultAsync(x => x.GalleryId == galleryId);
            if (gallery == null)
                return;
            _context.Photo.RemoveRange(gallery.Photos);
            _context.Gallery.Remove(gallery);
            await _context.SaveChangesAsync();
        }
        #endregion

        #region Files
        public async Task AddFile(Photo photo)
        {
            await _context.Photo.AddAsync(photo);
            await _context.SaveChangesAsync();
        }

        public async ValueTask<bool> DeleteFile(Guid photoId, bool updateDB = true)
        {
            var photo = await _context.Photo.FirstOrDefaultAsync(x => x.PhotoId == photoId);
            if (photo == null)
                return false;

            _context.Photo.Remove(photo);

            if (updateDB)
                await _context.SaveChangesAsync();

            return true;
        }
        #endregion

        #region Video

        public async Task<IEnumerable<Video>> GetVideo() =>
           await _context.Video
           .ToListAsync();

        public async Task<Video> GetVideo(int videoId) =>
            await _context.Video
            .FirstOrDefaultAsync(x => x.VideoId == videoId);

        public async Task AddVideo(Video video)
        {
            var chek = await _context.Video.FirstOrDefaultAsync(x => x.VideoId == video.VideoId);
            if (chek != null)
            {
                throw new Exception();
            }
            await _context.Video.AddAsync(video);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateVideo(Video video)
        {
            _context.Video.Update(video);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteVideo(int videoId)
        {
            var video = await _context.Video.FirstOrDefaultAsync(x => x.VideoId == videoId);
            if (video == null)
                return;
            _context.Video.Remove(video);
            await _context.SaveChangesAsync();
        }

        #endregion

        #region Order

        public async Task<IEnumerable<Order>> GetOrders(bool includeProductInfo = false)
        {
            var query = _context.Order
                .Include(x => x.OrderPositions)
                .Include(x => x.Status)
                .AsQueryable();

            if (includeProductInfo)
            {
                query = query
                    .Include(x => x.OrderPositions)
                        .ThenInclude(x => x.Product)
                            .ThenInclude(x => x.Subcategory)
                                .ThenInclude(x => x.Category);
            }

            return await query.ToListAsync();
        }

        public async Task<Order> GetOrder(int orderId)
        {
            var order = await _context.Order
            .Include(x => x.OrderPositions)
            .Include(x => x.Status)
            .FirstOrDefaultAsync(x => x.OrderId == orderId);
            return order;
        }


        public async Task AddOrder(Order order)
        {
            _context.Order.Add(order);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateOrder(Order order)
        {
            _context.Order.Update(order);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteOrder(int orderId)
        {
            var order = await _context.Order
                .Include(x => x.OrderPositions)
                .Include(x => x.Status)
                .FirstOrDefaultAsync(x => x.OrderId == orderId);
            if (order == null)
                return;
            _context.Order.Remove(order);
            //_context.OrderPosition.RemoveRange(order.OrderPositions);
            await _context.SaveChangesAsync();
        }

        public async Task<OrderStatus> GetStatus(int statusId) =>
            await _context.Status.FirstOrDefaultAsync(x => x.StatusId == statusId);
        public async Task<IEnumerable<OrderStatus>> GetStatusList() =>
            await _context.Status.ToListAsync();

        #endregion

        #region Search
        public async Task<IEnumerable<SearchDTO>> Search(string search, bool isGetOnlyVisible = true)
        {
            var categories = await GetCategoryImpl(search: search, isGetOnlyVisible: isGetOnlyVisible);
            var subcategories = await GetSubcategoriesImpl(search: search, isGetOnlyVisible: isGetOnlyVisible);
            var products = await GetProductsImpl(search: search, isGetOnlyVisible: isGetOnlyVisible);

            var result = new List<SearchDTO>();

            result.AddRange(categories.Select(x => new SearchDTO()
            {
                CategoryId = x.CategoryId,
                Photo = x.Photo,
                Alias = x.Alias
            }));

            result.AddRange(subcategories.Select(x => new SearchDTO()
            {
                CategoryId = x.CategoryId,
                SubcategoryId = x.SubcategoryId,
                Photo = x.Photo,
                Alias = x.Alias
            }));

            result.AddRange(products.Select(x => new SearchDTO()
            {
                CategoryId = x.CategoryId,
                SubcategoryId = x.SubcategoryId,
                ProductId = x.ProductId,
                Photos = x.Photos,
                Alias = x.Alias
            }));

            return result;
        }
        #endregion Search
    }
}
