using Database.Contexts;

using Microsoft.EntityFrameworkCore;

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
                CategoryId=x.CategoryId,                
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

        public async Task UpdateSubcategories(IEnumerable<Subcategory> subcategories,
                                              string newCategoryId)
        {
            var newSubcategory = subcategories.Select(x => new Subcategory()
            {
                CategoryId = newCategoryId,
                SubcategoryId = x.SubcategoryId,
                Alias = x.Alias,
                //Category = null,

                Photo = x.Photo,
                //Products = x.Products,
            });
            _context.Subcategory.RemoveRange(subcategories);
            _context.Subcategory.AddRange(newSubcategory);
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
        
        public async Task<IEnumerable<Product>> GetProducts(string categoryId, string subcategoryId) =>
            await _context.Product
            .Include(x => x.Photos)
            .Where(x => x.CategoryId == categoryId && x.SubcategoryId == subcategoryId)
            .ToListAsync();

        public async Task<Product> GetProduct(string productId, string subcategoryId, string categoryId) =>
            await _context.Product.Include(x => x.Photos)
            .FirstOrDefaultAsync(x => x.SubcategoryId == subcategoryId && x.CategoryId == categoryId && x.ProductId == productId);

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

        public async Task UpdateProducts(IEnumerable<Product> products,
                                         string newCategoryId,
                                         string newSubcategoryId)
        {
            var newProducts = products.Select(product => new Product()
            {
                CategoryId = newCategoryId,
                SubcategoryId = newSubcategoryId,
                ProductId = product.ProductId,

                Alias = product.Alias,
                Price = product.Price,
                Description = product.Description,

                //Subcategory = x.Subcategory,
                Photos = product.Photos.Select(photo => {
                    var id = Guid.NewGuid();

                    _context.Remove(photo);

                    return new Photo()
                    {
                        Date = DateTime.Now,
                        Name = id.ToString(),
                        PhotoId = id,
                        Url = photo.Url
                    };
                }).ToList(),
            }).ToList();
            _context.Product.AddRange(newProducts);
            _context.Product.RemoveRange(products);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteProduct(string productId, string subcategoryId, string categoryId)
        {
            var product = await _context.Product
                .FirstOrDefaultAsync(x => x.ProductId == productId && x.SubcategoryId == subcategoryId && x.CategoryId == categoryId);
            if (product == null)
                return;
            _context.Product.Remove(product);
            await _context.SaveChangesAsync();
        }
        #endregion

        #region News
        public async Task<IEnumerable<News>> GetNews() =>
            await _context.News
            .Include(x => x.Photo)
            .ToListAsync();

        public async Task<News> GetNews(int newsId) =>
            await _context.News
            .Include(x => x.Photo)
            .FirstOrDefaultAsync(x => x.NewsId == newsId);

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

        public async Task DeleteFile(Guid photoId)
        {
            var photo = await _context.Photo.FirstOrDefaultAsync(x => x.PhotoId == photoId);
            if (photo == null)
            {
                return;
            }
            _context.Photo.Remove(photo);
            await _context.SaveChangesAsync();
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
