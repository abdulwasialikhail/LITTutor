using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<AppUser>> GetUsersAsync();
        Task<IEnumerable<ApplicationDto>> GetApplicationsAsync();
        Task<ApplicationDto> GetApplicationByIdAsync (int id);
        Task<AppUser> GetUserApplicationStatus (bool status);
        Task<AppUser> GetUserByUsernameAsync (string name);
        Task<IEnumerable<MemberDto>> GetMembersAsync();
        Task<MemberDto> GetMemberAsync(string username);
    }
}