using DataBase.Abstraction;
using DataBase.Abstraction.Model;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataBase.Repository
{
    public partial class OurGardenRepository
    {
        public async Task<IEnumerable<ISearch>> Search(string search, bool isGetOnlyVisible = true)
        {
            var categories = await GetCategoryImpl(search: search, isGetOnlyVisible: isGetOnlyVisible);
            var subcategories = await GetSubcategoriesImpl(search: search, isGetOnlyVisible: isGetOnlyVisible);
            var products = await GetProductsImpl(search: search, isGetOnlyVisible: isGetOnlyVisible);

            var result = new List<ISearch>();

            result.AddRange(categories.Select(x => new Search()
            {
                CategoryId = x.CategoryId,
                Photos = x.Photos,
                Alias = x.Alias
            }));

            result.AddRange(subcategories.Select(x => new Search()
            {
                CategoryId = x.CategoryId,
                SubcategoryId = x.SubcategoryId,
                Photos = x.Photos,
                Alias = x.Alias
            }));

            result.AddRange(products.Select(x => new Search()
            {
                CategoryId = x.CategoryId,
                SubcategoryId = x.SubcategoryId,
                ProductId = x.ProductId,
                Photos = x.Photos,
                Alias = x.Alias
            }));

            return result;
        }
    }
}
