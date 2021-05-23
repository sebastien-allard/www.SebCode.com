using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CV.Data.Models
{
    public class Resume
    {
        [Key]
        public int Id { get; set; }
        
        public string Language { get; set; }


        public virtual ICollection<Technology> Technologies { get; set; }

        public virtual ICollection<Job> Jobs { get; set; }

        public virtual ICollection<Training> Trainings { get; set; }
    }

}
