using ApiService.Abstraction.Core;
using ApiService.Abstraction.DTO;

using Core.Helpers;

using MimeKit;

using System;
using System.IO;
using System.Threading.Tasks;

namespace ApiService.Core
{
    public partial class EmailService : IEmailService
    {
        private string CreateFeedbackBodySubject()
        {
            var subject = $"Форма обратной связи создана!";

            return subject;
        }

        private string GetFeedbackAdminTextBody()
        {
            return $"Здравствуйте! На сайте поступило новое письмо формы обратной связи.";
        }

        private string GetFeedbackClientTextBody(FeedbackDTO feedbackDTO)
        {
            return $"Здравствуйте, {feedbackDTO.FIO}! Мы получили ваше письмо и скоро на него ответим.";
        }

        /// <summary>
        /// Формирует текст сообщения из переданного имени шаблона с указанным содержимым тела сообщения.
        /// </summary>
        /// <param name="order">Заказ</param>
        /// <param name="templateFile">Имя файла</param>
        /// <param name="textBody">Тело сообщения</param>
        private async Task<MimeEntity> CreateFeedbackBody(FeedbackDTO feedbackDTO, string templateFile, string textBody)
        {
            var templateString = GetMjmlTemplateString(
                Path.Join(
                    Directory.GetCurrentDirectory(),
                    _emailServiceOptions.TemplatesFolder
                ),
                templateFile
            );

            var bodyMjmlFormattedString =
                GetBaseBodyMjmlFormattedString(
                    templateString,
                    fio: feedbackDTO.FIO,
                    phone: feedbackDTO.Phone,
                    email: feedbackDTO.Email
                );

            string htmlMessage;
            try
            {
                var mjmlMessage = await RenderMjml(bodyMjmlFormattedString);
                htmlMessage = mjmlMessage.Html;
            }
            catch (Exception ex)
            {
                throw new Exception(
                    $"Ошибка при отправке письма по обратной форме по шаблону {templateFile}" +
                        $"Форма:\n{JsonHelper.Serialize(feedbackDTO)}",
                    ex
                );
            }

            var body = new BodyBuilder
            {
                HtmlBody = htmlMessage,
                TextBody = textBody
            };

            return body.ToMessageBody();
        }
    }
}
