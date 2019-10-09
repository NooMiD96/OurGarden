using MimeKit;

using System.Threading.Tasks;

namespace Services.EMail
{
    public interface IEmailSender
    {
        Task SendOrderInformation(int orderId);
        Task SendEmailAsync(string email, string subject, MimeEntity message);
    }
}
