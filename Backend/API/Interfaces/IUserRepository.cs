using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);
        void UpdateApplication(ApplicationData application);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<AppUser>> GetUsersAsync();
        Task<IEnumerable<ApplicationDto>> GetApplicationsAsync();
        Task<ApplicationDto> GetApplicationByIdAsync (int id);
        Task<AppUser> GetUserApplicationStatus (bool status);
        Task<AppUser> GetUserByUsernameAsync (string name);
        Task<PagedList<MemberDto>> GetMembersPaginatedAsync(UserParams userParams);
        Task<IEnumerable<MemberDto>> GetMembersAsync();
        Task<AppUser> GetUserByIdAsync(int id);
        Task<MemberDto> GetMemberAsync(string username);
    }
}