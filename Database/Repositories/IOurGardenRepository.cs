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
        Task<Category> GetCategory(string categoryId);
        Task AddCategory(Category category);
        Task UpdateCategory(Category category);
        Task DeleteCategory(string categoryId);
        
        Task<IEnumerable<Subcategory>> GetAllSubcategories();
        Task<IEnumerable<Subcategory>> GetSubcategories(string categoryId);
        Task<Subcategory> GetSubcategory(string subcategoryId, string categoryId);
        Task AddSubcategory(Subcategory subcategory);
        Task UpdateSubategory(Subcategory subcategory);
        Task DeleteSubcategory(string subcategoryId, string categoryId);
        
        Task<IEnumerable<Product>> GetAllProducts();
        Task<IEnumerable<Product>> GetProducts(string categoryId, string subcategoryId);
        Task<Product> GetProduct(string productId, string subcategoryId, string categoryId);
        Task AddProduct(Product product);
        Task UpdateProduct(Product product);
        Task DeleteProduct(string productId, string subcategoryId, string categoryId);
        
        Task<IEnumerable<News>> GetNews();
        Task<News> GetNews(int newsId);
        Task AddNews(News news);
        Task UpdateNews(News news);
        Task DeleteNews(int newsId);
        
        Task AddFile(Photo photo);
        
        
    }   
}       
        