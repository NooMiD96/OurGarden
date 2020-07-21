using ApiService.Abstraction.Model;

using DataBase.Abstraction.Model;

using Microsoft.AspNetCore.Http;

using System.Threading.Tasks;

namespace ApiService.Abstraction.Api
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
        public Task<ServiceExecuteResult<PageInfo>> GetPageInfo(int pageInfoId);
    }
}
