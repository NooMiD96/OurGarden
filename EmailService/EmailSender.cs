using Core.Helpers;

using EmailService.Abstraction;

using MailKit.Net.Smtp;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using MimeKit;

using Model;

using System;
using System.Threading.Tasks;

namespace EmailService
{
    /// <summary>
    /// Сервис по отправке писем по почте.
    /// </summary>
    public class EmailSender: IEmailSender
    {
        #region Fields

        private readonly EmailOption _emailOption;

        private readonly ILogger _logger;

        #endregion

        #region .ctor

        /// <summary>
        /// .ctor
        /// </summary>
        public EmailSender(IOptions<EmailOption> emailOption,
                           ILogger<EmailSender> logger)
        {
            _emailOption = emailOption.Value;
            _logger = logger;
        }

        #endregion

        #region IEmailSender Impl

        /// <inheritdoc/>
        public async Task SendEmailAsync(string email, string subject, MimeEntity message)
        {
            try
            {
                var mimeMessage = new MimeMessage();

                mimeMessage.From.Add(new MailboxAddress(_emailOption.SenderName, _emailOption.Sender));
                mimeMessage.To.Add(MailboxAddress.Parse(email));
                mimeMessage.Subject = subject;
                mimeMessage.Body = message;

                using var client = new SmtpClient
                {
                    // For demo-purposes, accept all SSL certificates (in case the server supports STARTTLS)
                    ServerCertificateValidationCallback = (s, c, h, e) => true
                };

                try
                {
                    await client.ConnectAsync(_emailOption.Server, _emailOption.Port, useSsl: true);
                }
                catch (Exception ex)
                {
                    var msg = $"Не удалось установить соединение.";
                    _logger.LogError(ex, $"{msg}\n{JsonHelper.Serialize(client)}");
                    throw new Exception(msg, ex);
                }

                try
                {
                    await client.AuthenticateAsync(_emailOption.Sender, _emailOption.Password);
                }
                catch (Exception ex)
                {
                    var msg = $"Не удалось авторизоваться.";
                    _logger.LogError(ex, $"{msg}\n{JsonHelper.Serialize(client)}");
                    throw new Exception(msg, ex);
                }

                try
                {
                    await client.SendAsync(mimeMessage);
                }
                catch (Exception ex)
                {
                    var msg = $"Не удалось отправить письмо.";
                    _logger.LogError(ex, $"{msg}\n{JsonHelper.Serialize(client)}");
                    throw new Exception(msg, ex);
                }

                try
                {
                    await client.DisconnectAsync(true);
                }
                catch (Exception ex)
                {
                    var msg = $"Не удалось разорвать соединение.";
                    _logger.LogError(ex, $"{msg}\n{JsonHelper.Serialize(client)}");
                    throw new Exception(msg, ex);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Ошибка при попытке отправить письмо на почту \"{email}\".");
            }
        }

        #endregion
    }
}
