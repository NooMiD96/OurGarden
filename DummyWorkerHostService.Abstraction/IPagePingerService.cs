using System.Threading.Tasks;

namespace PagePingerHostService.Abstraction
{
    /// <summary>
    /// Интерфейс описывающий 
    /// </summary>
    public interface IPagePingerService
    {
        /// <summary>
        /// Пинг страницы.
        /// </summary>
        /// <param name="page">Урл страницы.</param>
        Task PingMainPage(string page = null);
    }
}
