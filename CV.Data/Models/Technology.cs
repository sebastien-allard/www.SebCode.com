using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CV.Data.Models
{
    public class Technology
    {
        [Key]
        public int Id { get; set; }

        public int? ResumeId { get; set; }

        public virtual Resume Resume { get; set; }

        public string Title { get; set; }

        public string Subtitle { get; set; }

        public int Order { get; set; }

        public int? ParentId { get; set; }
        
        public virtual Technology Parent { get; set; }

        public virtual ICollection<Technology> Children { get; set; }

    }

}
