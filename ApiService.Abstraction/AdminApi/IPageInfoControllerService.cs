using ApiService.Abstraction.DTO;
using ApiService.Abstraction.Model;

using DataBase.Abstraction.Model;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApiService.Abstraction.AdminApi
{
    /// <summary>
    /// Сервис обработки контроллера информации о страницах
    /// </summary>
    public interface IPageInfoControllerService
    {
        /// <summary>
        /// Получение списка страниц
        /// </summary>
        Task<ServiceExecuteResult<IEnumerable<PageInfo>>> GetPageInfos();

        /// <summary>
        /// Добавление новой страницы
        /// </summary>
        /// <param name="pageInfoDTO">Модель страницы</param>
        Task<ServiceExecuteResult<bool>> AddOrUpdate(PageInfoDTO pageInfoDTO);

        /// <summary>
        /// Удаление имеющейся страницы
        /// </summary>
        /// <param name="pageInfoId">Ид страницы</param>
        Task<ServiceExecuteResult<bool>> DeletePageInfo(int pageInfoId);
    }
}
