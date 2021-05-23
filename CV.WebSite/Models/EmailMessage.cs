using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace CV.WebSite.Models
{
    /// <summary>
    /// Email Model
    /// </summary>
    public class EmailMessage
    {
        /// <summary>
        /// reCAPTCHA validation
        /// </summary>
        [JsonProperty("g-recaptcha-response")]
        [JsonPropertyName("g-recaptcha-response")]
        public string Recaptcha { get; set; }
        /// <summary>
        /// Sender's name
        /// </summary>
        public string SenderName { get; set; }
        /// <summary>
        /// Sender's email address
        /// </summary>
        public string SenderEmail { get; set; }
        /// <summary>
        /// HTML body of the message
        /// </summary>
        public string SenderMessage { get; set; }
    }
}
