using System.Threading.Tasks;

namespace SiteMapHostService.Abstraction
{
    public interface ISiteMapBuilder
    {
        /// <summary>
        /// Создание карты сайта.
        /// </summary>
        /// <returns></returns>
        Task CreateSiteMap();
    }
}
