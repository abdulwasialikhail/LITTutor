namespace API.DTOs
{
    public class UserDto
    {
        public string UserName { get; set; }
        public string Token { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int UserType { get; set; }
        public string CheckEmail { get; set; }
        public bool CheckApplicationStatus { get; set; }
    }
}