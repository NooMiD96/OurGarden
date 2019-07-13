using Model.DB;
using System;
using System.Collections.Generic;
using System.Text;

namespace Database.Repositories
{
    public interface IOurGardenRepository
    {
        IEnumerable<Category> GetCategories();
        Category GetCategory(string categoryId);
        void AddCategory(Category category);
        void UpdateCategory(Category category);
        void DeleteCategory(string categoryId);

        IEnumerable<Subcategory> GetAllSubcategories();
        IEnumerable<Subcategory> GetSubcategories(string categoryId);
        Subcategory GetSubcategory(string subcategoryId, string categoryId);
        void AddSubcategory(Subcategory subcategory);
        void UpdateSubategory(Subcategory subcategory);
        void DeleteSubcategory(string subcategoryId, string categoryId);

        IEnumerable<Product> GetAllProducts();
        IEnumerable<Product> GetProducts(string categoryId, string subcategoryId);
        Product GetProduct(string productId, string subcategoryId, string categoryId);
        void AddProduct(Product product);
        void UpdateProduct(Product product);
        void DeleteProduct(string productId, string subcategoryId, string categoryId);

        IEnumerable<News> GetNews();
        News GetNews(int newsId);
        void AddNews(News news);
        void UpdateNews(News news);
        void DeleteNews(int newsId);

        void AddFile(Photo photo);


    }
}
