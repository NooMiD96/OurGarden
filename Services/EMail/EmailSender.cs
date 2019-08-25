using MailKit.Net.Smtp;

using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Options;

using MimeKit;
using MimeKit.Text;

using Model.EMail;

using System;
using System.Threading.Tasks;

namespace Services.EMail
{
    public partial class EmailSender: IEmailSender
    {
        private readonly EmailSettings _emailSettings;
        private readonly IHostingEnvironment _env;

        public EmailSender(IOptions<EmailSettings> emailSettings, IHostingEnvironment env)
        {
            _emailSettings = emailSettings.Value;
            _env = env;
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
            try
            {
                var mimeMessage = new MimeMessage();

                mimeMessage.From.Add(new MailboxAddress(_emailSettings.SenderName, _emailSettings.Sender));
                mimeMessage.To.Add(new MailboxAddress(email));
                mimeMessage.Subject = subject;
                mimeMessage.Body = message;

                using (var client = new SmtpClient())
                {
                    // For demo-purposes, accept all SSL certificates (in case the server supports STARTTLS)
                    //client.ServerCertificateValidationCallback = (s, c, h, e) => true;

                    if (_env.IsDevelopment())
                    {
                        // The third parameter is useSSL (true if the client should make an SSL-wrapped
                        // connection to the server; otherwise, false).
                        //await client.ConnectAsync(_emailSettings.MailServer, _emailSettings.MailPort, true);
                        await client.ConnectAsync(_emailSettings.MailServer);
                    }
                    else
                    {
                        await client.ConnectAsync(_emailSettings.MailServer, _emailSettings.MailPort, useSsl: false);
                    }

                    // Note: only needed if the SMTP server requires authentication
                    await client.AuthenticateAsync(_emailSettings.Sender, _emailSettings.Password);

                    await client.SendAsync(mimeMessage);

                    await client.DisconnectAsync(true);
                }
            }
            catch (Exception ex)
            {
                // TODO: handle exception
                throw new InvalidOperationException(ex.Message);
            }
        }
    }
}
