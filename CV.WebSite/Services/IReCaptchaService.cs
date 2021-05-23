using System.Threading.Tasks;

namespace CV.WebSite.Services
{
    public interface IReCaptchaService
    {
        Task<bool> IsReCaptchValidAsync(string captchaResponse);
    }
}