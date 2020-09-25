using ApiService.Abstraction.Model;

using DataBase.Abstraction;
using DataBase.Abstraction.Model;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApiService.Abstraction.Api
{
    /// <summary>
    /// Сервис работы контроллера новостей
    /// </summary>
    public interface INewsControllerService
    {
        /// <summary>
        /// Получение хлебных крошек
        /// </summary>
        /// <param name="newsId">Ид</param>
        Task<ServiceExecuteResult<IEnumerable<IBreadcrumb>>> GetBreadcrumb(string newsId);

        /// <summary>
        /// Получение всего списка новостей
        /// </summary>
        Task<ServiceExecuteResult<IEnumerable<News>>> GetAllNews();

        /// <summary>
        /// Получение последней новости
        /// </summary>
        /// <param name="newsId">Ид</param>
        /// <returns></returns>
        Task<ServiceExecuteResult<News>> GetNews(string newsId);
    }
}
