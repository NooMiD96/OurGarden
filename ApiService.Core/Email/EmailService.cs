using ApiService.Abstraction.Core;
using ApiService.Abstraction.DTO;

using Core.Helpers;
using Core.Utils;

using DataBase.Abstraction.Repositories;

using EmailService.Abstraction;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Mjml.AspNetCore;

using Model;

using System;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace ApiService.Core.Email
{
    public partial class EmailService : IEmailService
    {
        #region Fields

        private readonly ILogger _logger;

        private readonly IOurGardenRepository _repository;

        /// <summary>
        /// Сервис по рендеру шаблона Mjml.
        /// </summary>
        private readonly IMjmlServices _mjmlServices;

        /// <summary>
        /// Настройки сервиса по отправке писем.
        /// </summary>
        private readonly EmailServiceConfigurationOptions _emailServiceOptions;

        /// <summary>
        /// Основные настройки приложения
        /// </summary>
        private readonly RootOptions _rootOptions;

        /// <summary>
        /// Сервис отправки писем.
        /// </summary>
        private readonly IEmailSender _emailSender;

        #endregion

        #region .ctor

        /// <summary>
        /// .ctor
        /// </summary>
        public EmailService(ILogger<EmailService> logger,
                            IOurGardenRepository repository,
                            IMjmlServices mjmlServices,
                            IOptions<EmailServiceConfigurationOptions> emailOption,
                            IOptions<RootOptions> rootOptions,
                            IEmailSender emailSender)
        {
            _logger = logger;
            _repository = repository;
            _mjmlServices = mjmlServices;
            _emailServiceOptions = emailOption.Value;
            _rootOptions = rootOptions.Value;
            _emailSender = emailSender;
        }

        #endregion

        #region IEmailService Impl

        /// <inheritdoc/>
        public async Task SendFeedback(FeedbackDTO feedbackDTO)
        {
            try
            {
                var subject = CreateFeedbackBodySubject();

                var clientBodyInner = await CreateFeedbackBody(
                    feedbackDTO,
                    _emailServiceOptions.FeedbackClientTemplateName,
                    GetFeedbackClientTextBody(feedbackDTO)
                );
                var adminBodyInner = await CreateFeedbackBody(
                    feedbackDTO,
                    _emailServiceOptions.FeedbackAdminTemplateName,
                    GetFeedbackAdminTextBody()
                );

                await Task.WhenAll(
                    _emailSender.SendEmailAsync(feedbackDTO.Email, subject, clientBodyInner),
                    _emailSender.SendEmailAsync(_emailServiceOptions.ReplyToMail, subject, adminBodyInner)
                );
            }
            catch (Exception ex)
            {
                var msg = $"Ошибка при отправке письма обратной формы: {ex.Message}";
                _logger.LogError(ex, $"{msg} Модель:\n{JsonHelper.Serialize(feedbackDTO)}");
                throw new Exception(msg, ex);
            }
        }

        /// <inheritdoc/>
        public async Task SendOrderInformation(int orderId)
        {
            try
            {
                var order = await GetOrderItemsInformation(orderId);

                var subject = CreateOrderBodySubject(order.OrderId, order.Date);

                var clientBodyInner = await CreateOrderBody(
                    order,
                    _emailServiceOptions.OrderClientTemplateName,
                    GetClientOrderTextBody(order)
                );
                var adminBodyInner = await CreateOrderBody(
                    order,
                    _emailServiceOptions.OrderAdminTemplateName,
                    GetAdminOrderTextBody(order)
                );

                await Task.WhenAll(
                    _emailSender.SendEmailAsync(order.Email, subject, clientBodyInner),
                    _emailSender.SendEmailAsync(_emailServiceOptions.ReplyToMail, subject, adminBodyInner)
                );
            }
            catch (Exception ex)
            {
                var msg = $"Ошибка при отправке информационного письма о заказе №{orderId}. {ex.Message}";
                _logger.LogError(ex, msg);
                throw new Exception(msg, ex);
            }
        }

        #endregion

        #region General Private

        /// <summary>
        /// Производит рендер Mjml шаблона.
        /// В случае, если HTML'ную страницу не удалось получить,
        /// то будет вызвано исключение.
        /// </summary>
        /// <param name="view">Шаблон</param>
        private async Task<MjmlResponse> RenderMjml(string view)
        {
            var mjmlMessage = await _mjmlServices.Render(view);
            if (string.IsNullOrEmpty(mjmlMessage.Html) && (mjmlMessage.Errors?.Length ?? -1) != 0)
            {
                throw new Exception(
                    $"Ошибка при формировании письма. Используемый шаблон:\n" +
                        $"{view}\n" +
                        $"Полученные ошибки:\n{mjmlMessage.Errors.Select(x => x.Message).Aggregate((acc, val) => $"{acc}\n{val}")}."
                );
            }

            return mjmlMessage;
        }

        /// <summary>
        /// Добавляет в заданные макросы в шаблоне корректную информацию.
        /// </summary>
        /// <param name="templateString">Строка шаблона.</param>
        /// <param name="fio">Фио</param>
        /// <param name="phone">Телефон</param>
        /// <param name="email">Почта</param>
        private string GetBaseBodyMjmlFormattedString(string templateString, string fio, string phone, string email)
        {
            return templateString
                .Replace("{{FIO}}", fio, StringComparison.InvariantCultureIgnoreCase)
                .Replace("{{Phone}}", phone ?? "Не указан", StringComparison.InvariantCultureIgnoreCase)
                .Replace("{{Email}}", email ?? "Не указана", StringComparison.InvariantCultureIgnoreCase)
                .Replace("{{HostAddress}}", WebUtils.GenerateSiteAddress(_rootOptions.HostName), StringComparison.InvariantCultureIgnoreCase);
        }

        /// <summary>
        /// Получение шаблона письма в виде строки со всеми импортированными файлами.
        /// </summary>
        /// <param name="rootPath">Путь к папке с шаблонами писем.</param>
        /// <param name="filePath">Путь к файлу относительно папки с шаблонами.</param>
        private string GetMjmlTemplateString(string rootPath, string filePath)
        {
            var template = File.ReadAllText(
                Path.Combine(rootPath, filePath)
            );

            var templateFileIncludeMatches = Regex.Matches(
                template,
                "<mj-include path=\"(?<templateFilePath>.*?)\" />"
            );
            foreach (Match templateMath in templateFileIncludeMatches)
            {
                var includeFilePath = templateMath.Groups["templateFilePath"]?.Value;
                if (!string.IsNullOrEmpty(includeFilePath))
                {
                    template = template.Replace(
                        templateMath.Value,
                        GetMjmlTemplateString(
                            rootPath,
                            Path.Combine(rootPath, includeFilePath)
                        )
                    );
                }
            }

            return template;
        }

        #endregion
    }
}
