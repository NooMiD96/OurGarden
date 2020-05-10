using DataBase.Abstraction.Model;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DataBase.Abstraction.Repositories
{
    public interface IOurGardenRepository
    {
        #region Category

        Task<IEnumerable<Category>> GetCategories(bool isGetOnlyVisible = false);
        
        Task<IEnumerable<IItemDictionary>> GetSimpleCategories(bool includeSubcategory = false);
        
        Task<Category> GetCategory(string categoryId, bool includeSubcategory = false);
        
        ValueTask<(bool isSuccess, string error)> AddCategory(Category category);
        
        ValueTask<(bool isSuccess, string error)> UpdateCategory(Category category);
        
        Task DeleteCategory(string categoryId);
        
        Task DeleteCategory(Category category);

        #endregion Category

        #region Subcategory

        Task<IEnumerable<Subcategory>> GetSubcategories(bool isGetOnlyVisible = false);
        
        Task<IEnumerable<Subcategory>> GetSubcategories(string categoryId, bool isGetOnlyVisible = false);
        
        Task<Subcategory> GetSubcategory(string categoryId, string subcategoryId, bool includeProducts = false);
        
        Task<IEnumerable<IBreadcrumb>> GetSubcategoryBreadcrumb(string categoryId);
        
        ValueTask<(bool isSuccess, string error)> AddSubcategory(Subcategory subcategory);
        
        ValueTask<(bool isSuccess, string error)> UpdateSubcategory(Subcategory subcategory);
        
        Task DeleteSubcategory(string categoryId, string subcategoryId);
        
        Task DeleteSubcategory(Subcategory subcategory);

        #endregion Subcategory

        #region Product

        Task<IEnumerable<Product>> GetProducts();
        
        Task<IEnumerable<Product>> GetProducts(string categoryId, string subcategoryId, bool isGetOnlyVisible = false);
        
        Task<Product> GetProduct(string categoryId, string subcategoryId, string productId);
        
        Task<IEnumerable<IBreadcrumb>> GetProductBreadcrumb(string categoryId, string subcategoryId);
        
        Task<IEnumerable<IBreadcrumb>> GetProductBreadcrumb(string categoryId, string subcategoryId, string productId);
        
        ValueTask<(bool isSuccess, string error)> AddProduct(Product product);
        
        ValueTask<(bool isSuccess, string error)> UpdateProduct(Product product);
        
        ValueTask<bool> DeleteProduct(string categoryId, string subcategoryId, string productId);
        
        ValueTask<bool> DeleteProduct(Product product);

        #endregion Product

        #region Client

        Task<IEnumerable<Client>> GetClients();
        
        Task<Client> GetClient(int clientId);
        
        Task AddClient(Client client);
        
        Task UpdateClient(Client client);
        
        Task DeleteClient(int clientId);

        #endregion Client

        #region News

        Task<IEnumerable<News>> GetNews(bool includeDescriptions = true);
        
        Task<News> GetNews(int newsId);
        
        Task<News> GetNews(string alias, bool includeDescriptions = true);
        
        Task<IEnumerable<IBreadcrumb>> GetNewsBreadcrumb(string alias);
        
        Task<bool> CheckNewsAlias(string alias);
        
        ValueTask<(bool isSuccess, string error)> AddNews(News news);
        
        ValueTask<(bool isSuccess, string error)> UpdateNews(News news);
        
        Task DeleteNews(int newsId);
        
        ValueTask<bool> DeleteNews(News news);

        #endregion News

        #region Gallery

        Task<IEnumerable<Gallery>> GetGalleries();
        
        Task<Gallery> GetGallery(int galleryId);
        
        Task<Gallery> GetGallery(string galleryAlias);
        
        ValueTask<(bool isSuccess, string error)> AddGallery(Gallery gallery);
        
        ValueTask<(bool isSuccess, string error)> UpdateGallery(Gallery gallery);
        
        Task DeleteGallery(int galleryId);

        #endregion Gallery

        #region Video

        Task<IEnumerable<Video>> GetVideo();
        
        Task<Video> GetVideo(int videoId);
        
        Task AddVideo(Video video);
        
        Task UpdateVideo(Video video);
        
        Task DeleteVideo(int videoId);

        #endregion Video

        #region Order

        Task<IEnumerable<Order>> GetOrders(bool includeProductInfo = false);
        
        Task<IEnumerable<OrderStatus>> GetStatusList();
        
        Task<Order> GetOrder(int orderId);
        
        Task AddOrder(Order order);
        
        Task UpdateOrder(Order order);
        
        Task DeleteOrder(int orderId);
        
        Task<OrderStatus> GetStatus(int statusId);

        #endregion Order

        #region Files

        Task AddFile(Photo photo, bool updateDB = true);
        
        ValueTask<bool> DeleteFile(Guid photoId, bool updateDB = true);

        #endregion Files

        #region Search

        Task<IEnumerable<ISearch>> Search(string search, bool isGetOnlyVisible = true);

        #endregion Search
    }
}
