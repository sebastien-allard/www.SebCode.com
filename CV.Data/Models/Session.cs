using System.ComponentModel.DataAnnotations;

namespace CV.Data.Models
{
    public class Session
    {
        [Key]
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public int Order { get; set; }

    }

}
