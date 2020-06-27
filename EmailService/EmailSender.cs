using Core.Helpers;

using DataBase.Abstraction.Repositories;

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
    public partial class EmailSender: IEmailSender
    {
        #region Fields

        private readonly EmailOption _emailOption;

        private readonly IOurGardenRepository _dbRepository;
        
        private readonly ILogger _logger;

        #endregion

        #region .ctor

        /// <summary>
        /// .ctor
        /// </summary>
        public EmailSender(IOptions<EmailOption> emailOption,
                           ILogger<EmailSender> logger,
                           IOurGardenRepository dbRepository)
        {
            _emailOption = emailOption.Value;
            _logger = logger;
            _dbRepository = dbRepository;
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
                    _logger.LogError(ex, $"ConnectAsync DROP\n{JsonHelper.Serialize(client)}");
                    throw new Exception("", ex);
                }

                try
                {
                    await client.AuthenticateAsync(_emailOption.Sender, _emailOption.Password);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"AuthenticateAsync DROP\n{JsonHelper.Serialize(client)}");
                    throw new Exception("", ex);
                }

                try
                {
                    await client.SendAsync(mimeMessage);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"SendAsync DROP\n{JsonHelper.Serialize(client)}");
                    throw new Exception("", ex);
                }

                try
                {
                    await client.DisconnectAsync(true);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"DisconnectAsync DROP\n{JsonHelper.Serialize(client)}");
                    throw new Exception("", ex);
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
