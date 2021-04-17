namespace API.DTOs
{
    public class AssignTutorDto
    {
        public string StudentEmail { get; set; }
        public string TutorEmail { get; set; }
        public int ApplicationStatusId { get; set; }
        public int AppUserId { get; set; }
        public int TutorId { get; set; }
    }
}