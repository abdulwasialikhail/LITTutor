namespace API.DTOs
{
    public class CreateApplicationDto
    {
        public string UserName { get; set; }
        public string Issue { get; set; }
        public string Course { get; set; }
        public int ApplicationStatusId { get; set; }
        public int AppUserId { get; set; }
    }
}