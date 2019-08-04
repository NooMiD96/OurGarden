using Model.DB;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Database.Repositories
{
    public interface IOurGardenRepository
    {
        Task<IEnumerable<Category>> GetCategories();
        Task<IEnumerable<Category>> GetSimpleCategories();
        Task<Category> GetCategory(string categoryId);
        Task AddCategory(Category category);
        Task UpdateCategory(Category category);
        Task DeleteCategory(string categoryId);
        
        Task<IEnumerable<Subcategory>> GetAllSubcategories();
        Task<IEnumerable<Subcategory>> GetSubcategories(string categoryId);
        Task<Subcategory> GetSubcategory(string subcategoryId, string categoryId);
        Task AddSubcategory(Subcategory subcategory);
        Task UpdateSubcategory(Subcategory subcategory);
        Task UpdateSubcategories(IEnumerable<Subcategory> subcategories, string newCategory);
        Task DeleteSubcategory(string subcategoryId, string categoryId);
        
        Task<IEnumerable<Product>> GetSearchProducts(string search);
        Task<IEnumerable<Product>> GetAllProducts();
        Task<IEnumerable<Product>> GetProducts(string categoryId, string subcategoryId);
        Task<Product> GetProduct(string productId, string subcategoryId, string categoryId);
        Task AddProduct(Product product);
        Task UpdateProduct(Product product);
        Task UpdateProducts(IEnumerable<Product> products, string newCategory, string newSubcategoryId);
        Task DeleteProduct(string productId, string subcategoryId, string categoryId);
        
        Task<IEnumerable<News>> GetNews();
        Task<News> GetNews(int newsId);
        Task AddNews(News news);
        Task UpdateNews(News news);
        Task DeleteNews(int newsId);

        Task<IEnumerable<Gallery>> GetGalleries();
        Task<Gallery> GetGallery(int galleryId);
        Task AddGallery(Gallery gallery);
        Task UpdateGallery(Gallery gallery);
        Task DeleteGallery(int galleryId);

        Task AddFile(Photo photo);
        Task DeleteFile(Guid photoId);
        
        Task<IEnumerable<Video>> GetVideo();
        Task<Video> GetVideo(int videoId);
        Task AddVideo(Video video);
        Task UpdateVideo(Video video);
        Task DeleteVideo(int videoId);

        Task<IEnumerable<Order>> GetOrders();
        Task<Order> GetOrder(int orderId);
        Task AddOrder(Order order);
        Task UpdateOrder(Order order);
        Task DeleteOrder(int orderId);
        Task<OrderStatus> GetStatus(int statusId);
    }   
}       
        