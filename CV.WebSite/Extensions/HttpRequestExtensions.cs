using Microsoft.AspNetCore.Http;

namespace CV.WebSite.Extensions
{
    public static class HttpRequestExtension
    {
        public static string GetCurrentLanguage(this HttpRequest request)
        {
            var language = request.Cookies["accept-language"];
            language = "en-CA" == language ? "en" : "fr";
            return language;
        }
    }
}
