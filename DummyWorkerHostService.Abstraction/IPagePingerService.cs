using System.Threading.Tasks;

namespace PagePingerHostService.Abstraction
{
    /// <summary>
    /// Интерфейс описывающий 
    /// </summary>
    public interface IPagePingerService
    {
        const string PageUrl = "https://xn----7sbbq5b0a1c.com";

        /// <summary>
        /// Пинг страницы.
        /// </summary>
        /// <param name="page">Урл страницы.</param>
        Task PingMainPage(string page = PageUrl);
    }
}
