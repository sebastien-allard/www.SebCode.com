using System.Net;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using SendGrid;
using SendGrid.Helpers.Mail;
using CV.WebSite.Models;

namespace CV.WebSite.Services
{
    public class EmailService : IEmailService
    {
        private readonly ILogger<EmailService> _logger;
        private readonly ISendGridClient _sendGridClient;
        private readonly IConfiguration _configuration;

        public EmailService(ILogger<EmailService> logger, ISendGridClient sendGridClient, IConfiguration configuration)
        {
            _logger = logger;
            _sendGridClient = sendGridClient;
            _configuration = configuration;
        }

        public SendGridMessage PrepareMessage(IPAddress remoteIpAddress, EmailMessage emailMessage)
        {
            var clientIp = remoteIpAddress.MapToIPv4().ToString();
            var msgText = $"From: \"{emailMessage.SenderName}\" &lt;{emailMessage.SenderEmail}&gt;\n"
                            + $"Ip: {clientIp}\n\n"
                            + $"{emailMessage.SenderMessage}\n";
            var plainTextContent = msgText;
            var htmlContent = msgText.Replace("\n", "<br/>");

            var from = new EmailAddress(
                _configuration.GetValue<string>("SendGrid:FromAddress"),
                _configuration.GetValue<string>("SendGrid:FromName"));

            var to = new EmailAddress(
                _configuration.GetValue<string>("SendGrid:ToAddress"),
                _configuration.GetValue<string>("SendGrid:ToName"));

            var subject = $"CV: Message de {emailMessage.SenderName} !";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);

            return msg;
        }

        public async Task<HttpStatusCode> SendEmailAsync(SendGridMessage msg)
        {
             var response = await _sendGridClient.SendEmailAsync(msg);
            //var response = new Response(HttpStatusCode.Accepted, null, null);
            
            _logger.LogInformation($"Response from SendMail: {response.StatusCode}");
            return response.StatusCode;
        }
    }
}
