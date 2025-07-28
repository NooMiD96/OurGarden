using EmailService.Abstraction;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MimeKit;
using Model;
using System;
using System.Reflection;
using System.Threading.Tasks;

namespace EmailService;

/// <summary>
/// Сервис по отправке писем по почте.
/// </summary>
/// <remarks>
/// .ctor
/// </remarks>
public class EmailSender(IOptions<EmailOptions> emailOption, ILogger<EmailSender> logger) : IEmailSender
{
    /// <inheritdoc/>
    public async Task SendEmailAsync(string email, string subject, MimeEntity message)
    {
        try
        {
            var mimeMessage = new MimeMessage();

            mimeMessage.From.Add(GetSenderMailbox());
            mimeMessage.To.Add(ParseToMailbox(email));
            mimeMessage.Subject = subject;
            mimeMessage.Body = message;

            using var client = new SmtpClient
            {
                // For demo-purposes, accept all SSL certificates (in case the server supports STARTTLS)
                ServerCertificateValidationCallback = (s, c, h, e) => true
            };

            try
            {
                await client.ConnectAsync(emailOption.Value.Server, emailOption.Value.Port, useSsl: emailOption.Value.Port != 25);
            }
            catch (Exception ex)
            {
                var msg = $"Не удалось установить соединение.";
                logger.LogError(ex, $"{msg}");
                throw new Exception(msg, ex);
            }

            try
            {
                await client.AuthenticateAsync(emailOption.Value.Sender, emailOption.Value.Password);
            }
            catch (Exception ex)
            {
                var msg = $"Не удалось авторизоваться.";
                logger.LogError(ex, $"{msg}");
                throw new Exception(msg, ex);
            }

            try
            {
                await client.SendAsync(mimeMessage);
            }
            catch (Exception ex)
            {
                var msg = $"Не удалось отправить письмо.";
                logger.LogError(ex, $"{msg}");
                throw new Exception(msg, ex);
            }

            try
            {
                await client.DisconnectAsync(true);
            }
            catch (Exception ex)
            {
                var msg = $"Не удалось разорвать соединение.";
                logger.LogError(ex, $"{msg}");
                throw new Exception(msg, ex);
            }
        }
        catch (Exception ex)
        {
            var msg = $"Ошибка при попытке отправить письмо на почту \"{email}\" по след. причине: {ex.Message}";
            logger.LogError(ex, msg);
            throw new Exception(msg, ex);
        }
    }

    private MailboxAddress GetSenderMailbox()
    {
        var sender = new MailboxAddress(emailOption.Value.SenderName, emailOption.Value.Sender);

        /// Ограчение хостинга beget:
        /// нужно чтобы отправитель остался в формате punycode
        var fieldInfo = typeof(MailboxAddress).GetField("address", BindingFlags.NonPublic | BindingFlags.Instance);

        if (fieldInfo == null)
        {
            throw new Exception("Ошибка при указании почты отправителя.");
        }

        fieldInfo.SetValue(sender, emailOption.Value.Sender);

        return sender;
    }

    private MailboxAddress ParseToMailbox(string email)
    {
        var mail = MailboxAddress.Parse(email);

        if (email.Split("@")[1].Equals(emailOption.Value.Sender.Split("@")[1], StringComparison.InvariantCultureIgnoreCase))
        {
            var fieldInfo = typeof(MailboxAddress).GetField("address", BindingFlags.NonPublic | BindingFlags.Instance);

            if (fieldInfo == null)
            {
                throw new Exception("Ошибка при указании почты отправителя.");
            }

            fieldInfo.SetValue(mail, email);
        }

        return mail;
    }
}
