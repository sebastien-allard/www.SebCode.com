using System.Net;
using System.Threading.Tasks;
using SendGrid.Helpers.Mail;
using CV.WebSite.Models;

namespace CV.WebSite.Services
{
    public interface IEmailService
    {
        SendGridMessage PrepareMessage(IPAddress remoteIpAddress, EmailMessage emailMessage);
        Task<HttpStatusCode> SendEmailAsync(SendGridMessage msg);
    }
}