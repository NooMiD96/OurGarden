using System.Threading.Tasks;

namespace SiteMapHostService.Abstraction
{
    public interface ISiteMapBuilder
    {
        Task CreateSiteMap();
    }
}
