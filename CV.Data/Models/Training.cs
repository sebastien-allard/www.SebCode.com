using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CV.Data.Models
{
    public class Training
    {
        [Key]
        public int Id { get; set; }

        public int? ResumeId { get; set; }

        public virtual Resume Resume { get; set; }

        public string Title { get; set; }

        public string Institution { get; set; }

        public string StartDate { get; set; }

        public string EndDate { get; set; }

        public string Description { get; set; }

        public virtual ICollection<Session> Sessions { get; set; }

        public string FinalMark { get; set; }
    }

}
