using Core.Helpers;

using MailKit.Net.Smtp;

using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using MimeKit;

using Model.EMail;

using System;
using System.Threading.Tasks;

namespace Services.EMail
{
    public partial class EmailSender: IEmailSender
    {
        private readonly EmailSettings _emailSettings;
        private readonly IHostingEnvironment _env;
        private readonly IServiceScopeFactory _scopeFactory;
        private readonly ILogger _logger;
        private const string CONTROLLER_LOCATE = "AdminApi.CategoryController";

        public EmailSender(IOptions<EmailSettings> emailSettings,
                           ILogger<EmailSender> logger,
                           IHostingEnvironment env,
                           IServiceScopeFactory scopeFactory)
        {
            _emailSettings = emailSettings.Value;
            _env = env;
            _scopeFactory = scopeFactory;
            _logger = logger;
        }

        /// <summary>
        /// Отправка информации на почту пользователю <paramref name="email"/>.
        /// </summary>
        /// <param name="email">Кому отправить</param>
        /// <param name="subject">Заголовок</param>
        /// <param name="message">Сообщение. Отображается в body</param>
        /// <returns></returns>
        public async Task SendEmailAsync(string email, string subject, MimeEntity message)
        {
            const string API_LOCATE = CONTROLLER_LOCATE + ".SendEmailAsync";

            try
            {
                var mimeMessage = new MimeMessage();

                mimeMessage.From.Add(new MailboxAddress(_emailSettings.SenderName, _emailSettings.Sender));
                mimeMessage.To.Add(new MailboxAddress(email));
                mimeMessage.Subject = subject;
                mimeMessage.Body = message;

                using var client = new SmtpClient
                {
                    // For demo-purposes, accept all SSL certificates (in case the server supports STARTTLS)
                    ServerCertificateValidationCallback = (s, c, h, e) => true
                };

                try
                {
                    if (_env.IsDevelopment())
                    {
                        // The third parameter is useSSL (true if the client should make an SSL-wrapped
                        // connection to the server; otherwise, false).
                        //await client.ConnectAsync(_emailSettings.MailServer, _emailSettings.MailPort, true);
                        await client.ConnectAsync(_emailSettings.MailServer, _emailSettings.MailPort, useSsl: true);
                    }
                    else
                    {
                        await client.ConnectAsync(_emailSettings.MailServer, _emailSettings.MailPort, useSsl: true);
                    }
                }
                catch (Exception ex)
                {
                    client.ServerCertificateValidationCallback = null;
                    _logger.LogError(ex, $"ConnectAsync DROP\n{JsonHelper.Serialize(client)}");
                    throw new Exception("", ex);
                }

                try
                {
                    // Note: only needed if the SMTP server requires authentication
                    await client.AuthenticateAsync(_emailSettings.Sender, _emailSettings.Password);
                }
                catch (Exception ex)
                {
                    client.ServerCertificateValidationCallback = null;
                    _logger.LogError(ex, $"AuthenticateAsync DROP\n{JsonHelper.Serialize(client)}");
                    throw new Exception("", ex);
                }

                try
                {
                    await client.SendAsync(mimeMessage);
                }
                catch (Exception ex)
                {
                    client.ServerCertificateValidationCallback = null;
                    _logger.LogError(ex, $"SendAsync DROP\n{JsonHelper.Serialize(client)}");
                    throw new Exception("", ex);
                }

                try
                {
                    await client.DisconnectAsync(true);
                }
                catch (Exception ex)
                {
                    client.ServerCertificateValidationCallback = null;
                    _logger.LogError(ex, $"DisconnectAsync DROP\n{JsonHelper.Serialize(client)}");
                    throw new Exception("", ex);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"{API_LOCATE}\nSettings:\n{JsonHelper.Serialize(_emailSettings)}");
                //throw new InvalidOperationException(ex.Message);
            }
        }
    }
}
