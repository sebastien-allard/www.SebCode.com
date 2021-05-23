using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using CV.WebSite.Models;
using CV.WebSite.Services;

namespace CV.WebSite.Controllers
{
    /// <summary>
    /// Handles email requests.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class EmailController : ControllerBase
    {
        private readonly ILogger<EmailController> _logger;
        private readonly IReCaptchaService _recapchaService;
        private readonly IEmailService _emailService;

        public EmailController(ILogger<EmailController> logger, IReCaptchaService recapchaService, IEmailService emailService)
        {
            _logger = logger;
            _recapchaService = recapchaService;
            _emailService = emailService;
        }

        /// <summary>
        /// Send an email to the site administrator.
        /// </summary>
        /// <param name="emailMessage">Message to be sent.</param>
        /// <returns>HTTP Status Code 200-OK if successful.</returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        //[ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Post))]
        public async Task<IActionResult> Post([FromBody] EmailMessage emailMessage)
        {
            if (string.IsNullOrWhiteSpace(emailMessage.SenderEmail)
                || string.IsNullOrWhiteSpace(emailMessage.SenderName)
                || string.IsNullOrWhiteSpace(emailMessage.SenderMessage))
                return UnprocessableEntity();

            var recaptchaTask = _recapchaService.IsReCaptchValidAsync(emailMessage.Recaptcha);
            var msgTask = _emailService.PrepareMessage(Request.HttpContext.Connection.RemoteIpAddress, emailMessage);

            if (!recaptchaTask.Result)
            {
                _logger.LogWarning($"reCAPTCHA validation failed (ip: {Request.HttpContext.Connection.RemoteIpAddress.MapToIPv4()})");
                return Unauthorized();
            }

            var statusCode = await _emailService.SendEmailAsync(msgTask);
            return statusCode == HttpStatusCode.Accepted 
                ? Ok() 
                : this.StatusCode((int)statusCode); ;
        }
    }
}
