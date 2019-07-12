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

        public  IEnumerable<Category> GetCategories() => _context.Category;
        public IEnumerable<Subcategory> GetSubcategories(string categoryId) => _context.Subcategory.Where(x => x.CategoryId == categoryId);
        public IEnumerable<Product> GetProducts(string categoryId, string subcategoryId) => _context.Product.Include(x => x.Photos).Where(x => x.CategoryId == categoryId && x.SubcategoryId == subcategoryId);

    }
}
