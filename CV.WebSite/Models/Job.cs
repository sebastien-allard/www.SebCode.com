using System.Collections.Generic;
using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace CV.WebSite.Models
{
    public class Job
    {
        [JsonProperty("id")]
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonProperty("title")]
        [JsonPropertyName("title")]
        public string Title { get; set; }

        [JsonProperty("company")]
        [JsonPropertyName("company")]
        public string Company { get; set; }

        [JsonProperty("startDate")]
        [JsonPropertyName("startDate")]
        public string StartDate { get; set; }

        [JsonProperty("endDate")]
        [JsonPropertyName("endDate")]
        public string EndDate { get; set; }

        [JsonProperty("description")]
        [JsonPropertyName("description")]
        public string Description { get; set; }

        [JsonProperty("technologies")]
        [JsonPropertyName("technologies")]
        public string Technologies { get; set; }

        [JsonProperty("achievements")]
        [JsonPropertyName("achievements")]
        public IList<Achievement> Achievements { get; set; }
    }

}
