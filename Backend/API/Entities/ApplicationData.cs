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

        public int AppUserId { get; set; }
        public int TutorId { get; set; }

        [ForeignKey("AppUserId")]
        [InverseProperty("ApplicationData")]
        public AppUser AppUser { get; set; }
        [ForeignKey("TutorId")]
        [InverseProperty("ApplicationDataTutor")]
        public AppUser Tutor { get; set; }
    }
}