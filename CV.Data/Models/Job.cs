using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CV.Data.Models
{
    public class Job
    {
        [Key]
        public int Id { get; set; }

        public int? ResumeId { get; set; }

        public virtual Resume Resume { get; set; }

        public string Title { get; set; }

        public string Company { get; set; }

        public string StartDate { get; set; }

        public string EndDate { get; set; }

        public string Description { get; set; }

        public string Technologies { get; set; }

        public virtual ICollection<Achievement> Achievements { get; set; }
    }

}
