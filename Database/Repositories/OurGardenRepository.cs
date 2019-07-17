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

        #region Category
        public async Task<IEnumerable<Category>> GetCategories() => 
            await _context.Category
            .Include(x => x.Photo)
            .ToListAsync();

        public async Task<Category> GetCategory(string categoryId) => 
            await _context.Category
            .Include(x => x.Photo)
            .FirstOrDefaultAsync(x => x.CategoryId == categoryId);

        public async Task AddCategory(Category category)
        {
            var chek = await _context.Category.FirstOrDefaultAsync(x =>  x.CategoryId == category.CategoryId);
            if (chek != null)
            {
                throw new Exception();
            }
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
            await _context.Subcategory
            .ToListAsync();

        public async Task<IEnumerable<Subcategory>> GetSubcategories(string categoryId) =>
            await _context.Subcategory
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

        public async Task UpdateSubategory(Subcategory subcategory)
        {
            _context.Subcategory.Update(subcategory);
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

        public async Task<IEnumerable<Product>> GetAllProducts() =>
            await _context.Product
            .ToListAsync();

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
            var chek = await _context.Product.FirstOrDefaultAsync(x => x.ProductId == product.ProductId 
            && x.SubcategoryId == product.SubcategoryId && x.CategoryId == product.CategoryId);
            if (chek != null)
            {
                throw new Exception();
            }
            await _context.Product.AddAsync(product);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateProduct(Product product)
        {
            _context.Product.Update(product);
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

        public async Task AddFile(Photo photo)
        {
            await _context.AddAsync(photo);
            await _context.SaveChangesAsync();
        }
    }
}
