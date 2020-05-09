using System.Threading.Tasks;

namespace SiteMapHostService.Abstraction
{
    /// <summary>
    /// Сервис генерации карты сайта.
    /// </summary>
    public interface ISiteMapService
    {
        /// <summary>
        /// Генерация карты сайта.
        /// </summary>
        Task DoWork();
    }
}
