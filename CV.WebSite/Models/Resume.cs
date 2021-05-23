using System.Collections.Generic;
using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace CV.WebSite.Models
{
    public class Resume
    {
        [JsonProperty("technologies")]
        [JsonPropertyName("technologies")]
        public IList<Technology> Technologies { get; set; }

        [JsonProperty("jobs")]
        [JsonPropertyName("jobs")]
        public IList<Job> Jobs { get; set; }

        [JsonProperty("trainings")]
        [JsonPropertyName("trainings")]
        public IList<Training> Trainings { get; set; }
    }

}
