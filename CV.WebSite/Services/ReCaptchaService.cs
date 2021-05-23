using System;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace CV.WebSite.Services
{
    internal class ReCaptchaService : IReCaptchaService
    {
        private readonly ILogger<ReCaptchaService> _logger;
        static readonly HttpClient client = new HttpClient();
        private readonly IConfiguration _configuration;

        public ReCaptchaService(ILogger<ReCaptchaService> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
        }

        public async Task<bool> IsReCaptchValidAsync(string captchaResponse)
        {
            try
            {
                //var captchaResponse = Request.Form["g-recaptcha-response"];
                var secretKey = _configuration.GetValue<string>("reCAPTCHA:Secret");
                var apiUrl = "https://www.google.com/recaptcha/api/siteverify?secret={0}&response={1}";
                var requestUri = string.Format(apiUrl, secretKey, captchaResponse);

                var response = JsonSerializer.Deserialize<ReCaptchaResponse>(
                    await client.GetAsync(requestUri).Result.EnsureSuccessStatusCode().Content.ReadAsStringAsync());

                return response.Success;

            }
            catch (Exception e)
            {
                _logger.LogError(e, "Erreur de validation reCAPTCHA");
                throw;
            }
        }
    }
}
