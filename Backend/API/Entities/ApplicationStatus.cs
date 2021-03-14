using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("ApplicationStatus")]
    public class ApplicationStatus
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<ApplicationData> ApplicationData { get; set; }

    }
}