using ApiService.Abstraction.Model;

using Microsoft.AspNetCore.Http;

using System.Threading.Tasks;

namespace ApiService.Abstraction
{
    /// <summary>
    /// Сервис контроллера.
    /// </summary>
    public interface IHomeControllerService
    {
        /// <summary>
        /// Получение Ceo информации о запрашиваемой странице.
        /// </summary>
        /// <param name="httpContext">Контекст запроса</param>
        /// <returns>Сео информация.</returns>
        public Task<PageMainInformation> GetPageMainInformation(HttpContext httpContext);
    }
}
