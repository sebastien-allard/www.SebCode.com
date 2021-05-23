using System.Collections.Generic;
using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace CV.WebSite.Models
{
    public class Training
    {
        [JsonProperty("id")]
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonProperty("title")]
        [JsonPropertyName("title")]
        public string Title { get; set; }

        [JsonProperty("institution")]
        [JsonPropertyName("institution")]
        public string Institution { get; set; }

        [JsonProperty("startDate")]
        [JsonPropertyName("startDate")]
        public string StartDate { get; set; }

        [JsonProperty("endDate")]
        [JsonPropertyName("endDate")]
        public string EndDate { get; set; }

        [JsonProperty("description")]
        [JsonPropertyName("description")]
        public string Description { get; set; }

        [JsonProperty("sessions")]
        [JsonPropertyName("sessions")]
        public IList<Session> Sessions { get; set; }

        [JsonProperty("finalMark")]
        [JsonPropertyName("finalMark")]
        public string FinalMark { get; set; }
    }

}
