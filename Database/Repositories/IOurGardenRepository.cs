using Model.DB;
using System;
using System.Collections.Generic;
using System.Text;

namespace Database.Repositories
{
    public interface IOurGardenRepository
    {
       IEnumerable<Subcategory> GetSubcategories(string categoryId);
        IEnumerable<Category> GetCategories();
        Category GetCategory(string categoryId);
        void AddCategory(Category category);
        void UpdateCategory(Category category);
        void DeleteCategory(string categoryId);


        IEnumerable<Product> GetProducts(string categoryId, string subcategoryId);
        void AddFile(Photo photo);


    }
}
