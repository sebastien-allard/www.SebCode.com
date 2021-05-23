using System.Collections.Generic;
using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace CV.WebSite.Models
{
    public class Technology
    {
        [JsonProperty("id")]
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonProperty("title")]
        [JsonPropertyName("title")]
        public string Title { get; set; }

        [JsonProperty("subtitle")]
        [JsonPropertyName("subtitle")]
        public string Subtitle { get; set; }

        [JsonProperty("order")]
        [JsonPropertyName("order")]
        public int Order { get; set; }

        [JsonProperty("parentId")]
        [JsonPropertyName("parentId")]
        public int ParentId { get; set; }

        [JsonProperty("children")]
        [JsonPropertyName("children")]
        public IList<Technology> Children { get; set; }
    }

}
