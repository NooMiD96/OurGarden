using MimeKit;

using System.Threading.Tasks;

namespace EmailService.Abstraction
{
    /// <summary>
    /// Сервис по отправке писем по почте.
    /// </summary>
    public interface IEmailSender
    {
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
