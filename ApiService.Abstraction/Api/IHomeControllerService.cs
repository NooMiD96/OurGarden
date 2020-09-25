using ApiService.Abstraction.DTO;
using ApiService.Abstraction.Model;

using DataBase.Abstraction.Model;

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
        /// <param name="pageInfoId">Идентификатор страницы</param>
        /// <returns>Сео информация.</returns>
        Task<ServiceExecuteResult<PageInfo>> GetPageInfo(int pageInfoId);

        /// <summary>
        /// Отправка письма обратной связи. В случае ошибки вернётся причина.
        /// </summary>
        /// <param name="feedbackDTO">Модель отправки сообщения.</param>
        /// <returns></returns>
        Task<ServiceExecuteResult<bool>> SendFeedback(FeedbackDTO feedbackDTO);
    }
}
