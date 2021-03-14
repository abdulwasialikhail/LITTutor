using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("ApplicationData")]
    public class ApplicationData
    {
        public int Id { get; set; }
        public string Issue { get; set; }
        public string Course { get; set; }
        public ApplicationStatus ApplicationStatus { get; set; }
        public int ApplicationStatusId { get; set; }
        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
    }
}