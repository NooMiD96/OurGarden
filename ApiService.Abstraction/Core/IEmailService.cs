using ApiService.Abstraction.DTO;

using System.Threading.Tasks;

namespace ApiService.Abstraction.Core
{
    /// <summary>
    /// Сервис с логикой по формированию сообщений для отправки по почте.
    /// </summary>
    public interface IEmailService
    {
        /// <summary>
        /// Отправка информации о заказе пользователю и на свою почту.
        /// </summary>
        /// <param name="orderId">Номер заказа.</param>
        Task SendOrderInformation(int orderId);

        /// <summary>
        /// Отправка информации о заказе пользователю и на свою почту.
        /// </summary>
        /// <param name="feedbackDTO">Модель отправки обратной формы.</param>
        Task SendFeedback(FeedbackDTO feedbackDTO);
    }
}
