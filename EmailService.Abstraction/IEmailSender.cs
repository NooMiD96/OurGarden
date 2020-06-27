using MimeKit;

using System.Threading.Tasks;

namespace EmailService.Abstraction
{
    public interface IEmailSender
    {
        /// <summary>
        /// Отправка иформации о заказе пользователю и на свою почту.
        /// </summary>
        /// <param name="orderId">Номер заказа.</param>
        Task SendOrderInformation(int orderId);

        /// <summary>
        /// Отправка информации на почту пользователю <paramref name="email"/>.
        /// </summary>
        /// <param name="email">Кому отправить</param>
        /// <param name="subject">Заголовок</param>
        /// <param name="message">Сообщение. Отображается в body</param>
        /// <returns></returns>
        Task SendEmailAsync(string email, string subject, MimeEntity message);
    }
}
