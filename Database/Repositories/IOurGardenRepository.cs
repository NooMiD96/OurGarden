using Model.DB;
using System;
using System.Collections.Generic;
using System.Text;

namespace Database.Repositories
{
    public interface IOurGardenRepository
    {
       IEnumerable<Category> GetCategories();
       IEnumerable<Subcategory> GetSubcategories(string categoryId);
       IEnumerable<Product> GetProducts(string categoryId, string subcategoryId);
    }
}
