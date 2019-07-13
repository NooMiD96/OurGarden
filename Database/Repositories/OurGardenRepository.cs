using Database.Contexts;
using Microsoft.EntityFrameworkCore;
using Model.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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

        public IEnumerable<Subcategory> GetSubcategories(string categoryId) => _context.Subcategory.Where(x => x.CategoryId == categoryId);
        #region Category
        public IEnumerable<Category> GetCategories() => _context.Category.Include(x => x.Photo);

        public Category GetCategory(string categoryId) => _context.Category.Include(x => x.Photo).FirstOrDefault(x => x.CategoryId == categoryId);

        public void AddCategory(Category category)
        {
            _context.Category.Add(category);
            _context.SaveChanges();
        }

        public void UpdateCategory(Category category)
        {
            _context.Category.Update(category);
            _context.SaveChanges();
        }

        public void DeleteCategory(string categoryId)
        {
            var category = _context.Category.FirstOrDefault(x => x.CategoryId == categoryId);
            if (category == null)
                return;
            _context.Category.Remove(category);
            _context.SaveChanges();
        }
        #endregion
        public IEnumerable<Product> GetProducts(string categoryId, string subcategoryId) => _context.Product.Include(x => x.Photos).Where(x => x.CategoryId == categoryId && x.SubcategoryId == subcategoryId);

        public void AddFile(Photo photo)
        {
            _context.Add(photo);
            _context.SaveChanges();
        }
    }
}
