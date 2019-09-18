using Core.Helpers;

using Database.Contexts;

using Microsoft.EntityFrameworkCore;

using Model.Breadcrumb;
using Model.DB;
using Model.DTO.ProductDTO;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Database.Repositories
{
    public class OurGardenRepository : IOurGardenRepository
    {
        public readonly OurGardenContext _context;
        public OurGardenRepository(OurGardenContext context)
        {
            _context = context;
        }

        #region Category
        public async Task<IEnumerable<Category>> GetCategories() =>
            await _context.Category
            .Include(x => x.Photo)
            .ToListAsync();

        public async Task<IEnumerable<Category>> GetSimpleCategories() =>
            await _context.Category.Select(x => new Category()
            {
                Alias = x.Alias,
                CategoryId = x.CategoryId,
            })
            .ToListAsync();


        public async Task<Category> GetCategory(string categoryId) =>
            await _context.Category
            .Include(x => x.Photo)
            .FirstOrDefaultAsync(x => x.CategoryId == categoryId);

        public async Task AddCategory(Category category)
        {
            // var chek = await _context.Category.FirstOrDefaultAsync(x =>  x.CategoryId == category.CategoryId);
            // if (chek != null)
            // {
            //     throw new Exception();
            // }
            await _context.Category.AddAsync(category);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateCategory(Category category)
        {
            _context.Category.Update(category);
            await _context.SaveChangesAsync();
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
        public async Task<IEnumerable<Subcategory>> GetAllSubcategories() =>
            await _context.Subcategory.AsNoTracking()
            .Include(x => x.Photo)
            .ToListAsync();

        public async Task<IEnumerable<Subcategory>> GetSubcategories(string categoryId) =>
            await _context.Subcategory
            .Include(x => x.Photo)
            .Where(x => x.CategoryId == categoryId)
            .ToListAsync();

        public async Task<Subcategory> GetSubcategory(string subcategoryId, string categoryId) =>
            await _context.Subcategory
            .Include(x => x.Photo)
            .FirstOrDefaultAsync(x => x.SubcategoryId == subcategoryId && x.CategoryId == categoryId);

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

        public async Task AddSubcategory(Subcategory subcategory)
        {
            var chek = await _context.Subcategory.FirstOrDefaultAsync(x => x.SubcategoryId == subcategory.SubcategoryId && x.CategoryId == subcategory.CategoryId);
            if (chek != null)
            {
                throw new Exception();
            }
            await _context.Subcategory.AddAsync(subcategory);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateSubcategory(Subcategory subcategory)
        {
            _context.Subcategory.Update(subcategory);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteSubcategory(string subcategoryId, string categoryId)
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
        public async Task<IEnumerable<Product>> GetSearchProducts(string search) =>
           await _context.Product
            .Include(x => x.Photos)
            .Where(x => x.Alias.Contains(search))
            .ToListAsync();

        public async Task<IEnumerable<Product>> GetAllProducts() => await _context
            .Product
            .Include(x => x.Photos)
            .ToListAsync();

        public async Task<IEnumerable<CategoryDictionaryDTO>> GetCategoryDictionaryAsync()
        {
            var categoryList = await _context
                .Category
                .Include(x => x.Subcategories)
                .ToListAsync();

            return categoryList.Select(cat => new CategoryDictionaryDTO()
            {
                CategoryId = cat.CategoryId,
                Alias = cat.Alias,
                Subcategories = cat.Subcategories.Select(sub => new SubcategoryDictionaryDTO()
                {
                    SubcategoryId = sub.SubcategoryId,
                    Alias = sub.Alias
                })
            });
        }

        public async Task<IEnumerable<Product>> GetProducts(string categoryId, string subcategoryId) => await _context
            .Product
            .Include(x => x.Photos)
            .Where(x => x.CategoryId == categoryId && x.SubcategoryId == subcategoryId)
            .ToListAsync();

        public async Task<Product> GetProduct(string productId, string subcategoryId, string categoryId) => await _context
            .Product
            .Include(x => x.Photos)
            .FirstOrDefaultAsync(x => x.SubcategoryId == subcategoryId && x.CategoryId == categoryId && x.ProductId == productId);

        public async Task<List<Breadcrumb>> GetProductBreadcrumb(string categoryId, string subcategoryId)
        {
            categoryId = categoryId.TransformToId();
            subcategoryId = subcategoryId.TransformToId();

            var result = new List<Breadcrumb>();

            var subcategory = await _context.Subcategory
                .Include(x => x.Category)
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
                .Include(x => x.Subcategory)
                .ThenInclude(x => x.Category)
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

        public async Task AddProduct(Product product)
        {
            // var chek = await _context.Product.FirstOrDefaultAsync(
            //     x => x.ProductId == product.ProductId
            //          && x.SubcategoryId == product.SubcategoryId
            //          && x.CategoryId == product.CategoryId
            // );
            // if (chek != null)
            // {
            //     throw new Exception();
            // }
            await _context.Product.AddAsync(product);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateProduct(Product product)
        {
            _context.Product.Update(product);
            await _context.SaveChangesAsync();
        }

        public async ValueTask<bool> DeleteProduct(string productId, string subcategoryId, string categoryId)
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
        public async Task<IEnumerable<News>> GetNews(bool includeDescriptions = true)
        {
            var query = _context.News.Include(x => x.Photo).AsQueryable();

            if (!includeDescriptions)
            {
                query = query.Select(x => new News()
                {
                    NewsId = x.NewsId,
                    Title = x.Title,
                    Alias = x.Alias,
                    Date = x.Date,
                    Description = null,
                    Photo = x.Photo,
                });
            }

            var result = await query.ToListAsync();

            return result;
        }

        public async Task<News> GetNews(int newsId) =>
            await _context.News
            .Include(x => x.Photo)
            .FirstOrDefaultAsync(x => x.NewsId == newsId);

        public async Task<News> GetNews(string alias) =>
           await _context.News
           .Include(x => x.Photo)
           .FirstOrDefaultAsync(x => x.Alias == alias);

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

        public async Task<IEnumerable<Order>> GetOrders() =>
           await _context.Order
            .Include(x => x.OrderPositions)
            .Include(x => x.Status)
            .ToListAsync();

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
    }
}
