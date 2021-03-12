using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("UserType")]
    public class UserType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<AppUser> AppUser { get; set; }
    }
}