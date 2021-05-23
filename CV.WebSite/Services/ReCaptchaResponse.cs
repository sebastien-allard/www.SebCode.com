using System.Text.Json.Serialization;

namespace CV.WebSite.Services
{
    internal class ReCaptchaResponse
    {
        [JsonPropertyName("success")]
        public bool Success { get; set; }

        [JsonPropertyName("challenge_ts")]
        public string ChallengeTimeStamp { get; set; }

        [JsonPropertyName("hostname")]
        public string Hostname { get; set; }
    }
}
