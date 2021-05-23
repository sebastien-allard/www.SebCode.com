using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace CV.WebSite.Models
{

    public class Session
    {
        [JsonProperty("id")]
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonProperty("title")]
        [JsonPropertyName("title")]
        public string Title { get; set; }

        [JsonProperty("description")]
        [JsonPropertyName("description")]
        public string Description { get; set; }

        [JsonProperty("order")]
        [JsonPropertyName("order")]
        public int Order { get; set; }
    }

}
