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
        public IEnumerable<Category> GetCategories() => _context.Category.Include(x => x.Photo);

        public Category GetCategory(string categoryId) => _context.Category.Include(x => x.Photo).FirstOrDefault(x => x.CategoryId == categoryId);

        public void AddCategory(Category category)
        {
            var chek = _context.Category.FirstOrDefault(x =>  x.CategoryId == category.CategoryId);
            if (chek != null)
            {
                throw new Exception();
            }
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

        #region Subcategory      
        public IEnumerable<Subcategory> GetAllSubcategories() =>
            _context.Subcategory;

        public IEnumerable<Subcategory> GetSubcategories(string categoryId) =>
            _context.Subcategory.Where(x => x.CategoryId == categoryId);

        public Subcategory GetSubcategory(string subcategoryId, string categoryId) =>
            _context.Subcategory.Include(x => x.Photo)
            .FirstOrDefault(x => x.SubcategoryId == subcategoryId && x.CategoryId == categoryId);

        public void AddSubcategory(Subcategory subcategory)
        {
            var chek = _context.Subcategory.FirstOrDefault(x => x.SubcategoryId == subcategory.SubcategoryId && x.CategoryId == subcategory.CategoryId);
            if (chek != null) 
            {
                throw new Exception();
            }
            _context.Subcategory.Add(subcategory);
            _context.SaveChanges();
        }

        public void UpdateSubategory(Subcategory subcategory)
        {
            _context.Subcategory.Update(subcategory);
            _context.SaveChanges();
        }

        public void DeleteSubcategory(string subcategoryId, string categoryId)
        {
            var subcategory = _context.Subcategory
                .FirstOrDefault(x => x.SubcategoryId == subcategoryId && x.CategoryId == categoryId);
            if (subcategory == null)
                return;
            _context.Subcategory.Remove(subcategory);
            _context.SaveChanges();
        }
        #endregion

        #region Product

        public IEnumerable<Product> GetAllProducts() =>
            _context.Product;

        public IEnumerable<Product> GetProducts(string categoryId, string subcategoryId) =>
            _context.Product.Include(x => x.Photos).Where(x => x.CategoryId == categoryId && x.SubcategoryId == subcategoryId);

        public Product GetProduct(string productId, string subcategoryId, string categoryId) =>
            _context.Product.Include(x => x.Photos)
            .FirstOrDefault(x => x.SubcategoryId == subcategoryId && x.CategoryId == categoryId && x.ProductId == productId);

        public void AddProduct(Product product)
        {
            var chek = _context.Product.FirstOrDefault(x => x.ProductId == product.ProductId 
            && x.SubcategoryId == product.SubcategoryId && x.CategoryId == product.CategoryId);
            if (chek != null)
            {
                throw new Exception();
            }
            _context.Product.Add(product);
            _context.SaveChanges();
        }

        public void UpdateProduct(Product product)
        {
            _context.Product.Update(product);
            _context.SaveChanges();
        }

        public void DeleteProduct(string productId, string subcategoryId, string categoryId)
        {
            var product = _context.Product
                .FirstOrDefault(x => x.ProductId == productId && x.SubcategoryId == subcategoryId && x.CategoryId == categoryId);
            if (product == null)
                return;
            _context.Product.Remove(product);
            _context.SaveChanges();
        }
        #endregion

        #region News
        public IEnumerable<News> GetNews() => _context.News.Include(x => x.Photo);

        public News GetNews(int newsId) => _context.News.Include(x => x.Photo).FirstOrDefault(x => x.NewsId == newsId);

        public void AddNews(News news)
        {
            var chek = _context.News.FirstOrDefault(x => x.NewsId == news.NewsId);
            if (chek != null)
            {
                throw new Exception();
            }
            _context.News.Add(news);
            _context.SaveChanges();
        }

        public void UpdateNews(News news)
        {
            _context.News.Update(news);
            _context.SaveChanges();
        }

        public void DeleteNews(int newsId)
        {
            var news = _context.News.FirstOrDefault(x => x.NewsId == newsId);
            if (news == null)
                return;
            _context.News.Remove(news);
            _context.SaveChanges();
        }
        #endregion

        public void AddFile(Photo photo)
        {
            _context.Add(photo);
            _context.SaveChanges();
        }
    }
}
