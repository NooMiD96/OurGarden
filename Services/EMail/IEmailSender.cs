using MimeKit;

using Model.DB;

using System.Threading.Tasks;

namespace Services.EMail
{
    public interface IEmailSender
    {
        Task SendOrderInformation(Order order);
        Task SendEmailAsync(string email, string subject, MimeEntity message);
    }
}
