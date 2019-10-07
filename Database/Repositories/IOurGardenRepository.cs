using Model.Breadcrumb;
using Model.DB;
using Model.DTO.ProductDTO;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Database.Repositories
{
    public interface IOurGardenRepository
    {
        Task<IEnumerable<Category>> GetCategories(bool isGetOnlyVisible = false);
        Task<IEnumerable<Category>> GetSimpleCategories();
        Task<Category> GetCategory(string categoryId);
        Task AddCategory(Category category);
        Task UpdateCategory(Category category);
        Task DeleteCategory(string categoryId);
        Task DeleteCategory(Category category);

        Task<IEnumerable<Client>> GetClients();
        Task<Client> GetClient(int clientId);
        Task AddClient(Client client);
        Task UpdateClient(Client client);
        Task DeleteClient(int clientId);

        Task<IEnumerable<Subcategory>> GetAllSubcategories();
        Task<IEnumerable<Subcategory>> GetSubcategories(string categoryId, bool isGetOnlyVisible = false);
        Task<Subcategory> GetSubcategory(string subcategoryId, string categoryId);
        Task<List<Breadcrumb>> GetSubcategoryBreadcrumb(string categoryId);
        Task AddSubcategory(Subcategory subcategory);
        Task UpdateSubcategory(Subcategory subcategory);
        Task DeleteSubcategory(string subcategoryId, string categoryId);
        Task DeleteSubcategory(Subcategory subcategory);

        Task<IEnumerable<Product>> GetSearchProducts(string search);
        Task<IEnumerable<Product>> GetAllProducts();
        Task<IEnumerable<CategoryDictionaryDTO>> GetCategoryDictionaryAsync();
        Task<IEnumerable<Product>> GetProducts(string categoryId, string subcategoryId, bool isGetOnlyVisible = false);
        Task<Product> GetProduct(string productId, string subcategoryId, string categoryId);
        Task<List<Breadcrumb>> GetProductBreadcrumb(string categoryId, string subcategoryId);
        Task<List<Breadcrumb>> GetProductBreadcrumb(string categoryId, string subcategoryId, string productId);
        Task AddProduct(Product product);
        Task UpdateProduct(Product product);
        ValueTask<bool> DeleteProduct(string productId, string subcategoryId, string categoryId);
        ValueTask<bool> DeleteProduct(Product product);

        Task<IEnumerable<News>> GetNews(bool includeDescriptions = true);
        Task<News> GetNews(int newsId);
        Task<News> GetNews(string alias);
        Task<List<Breadcrumb>> GetNewsBreadcrumb(string alias);
        Task<bool> CheckNewsAlias(string alias);
        Task AddNews(News news);
        Task UpdateNews(News news);
        Task DeleteNews(int newsId);
        ValueTask<bool> DeleteNews(News news);

        Task<IEnumerable<Gallery>> GetGalleries();
        Task<Gallery> GetGallery(int galleryId);
        Task AddGallery(Gallery gallery);
        Task UpdateGallery(Gallery gallery);
        Task DeleteGallery(int galleryId);

        Task AddFile(Photo photo);
        ValueTask<bool> DeleteFile(Guid photoId, bool updateDB = true);
        
        Task<IEnumerable<Video>> GetVideo();
        Task<Video> GetVideo(int videoId);
        Task AddVideo(Video video);
        Task UpdateVideo(Video video);
        Task DeleteVideo(int videoId);

        Task<IEnumerable<Order>> GetOrders();
        Task<IEnumerable<OrderStatus>> GetStatusList();
        Task<Order> GetOrder(int orderId);
        Task AddOrder(Order order);
        Task UpdateOrder(Order order);
        Task DeleteOrder(int orderId);
        Task<OrderStatus> GetStatus(int statusId);
    }   
}       
        