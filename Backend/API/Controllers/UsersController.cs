using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _mapper = mapper;
            _userRepository = userRepository;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users = await _userRepository.GetMembersAsync();

            return Ok(users);
        }
        
        [HttpGet("members-paginated")]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsersPaginated([FromQuery]UserParams userParams)
        {
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());
            userParams.CurrentUsername = User.GetUsername();

            // if (string.IsNullOrEmpty(userParams.Gender))
            // {
            //     userParams.Gender = user.Gender == "male" ? "female" : "male";
            // }


            var users = await _userRepository.GetMembersPaginatedAsync(userParams);

            Response.AddPaginationHeader(users.CurrentPage, userParams.PageSize, 
                users.TotalCount, users.TotalPages);

            return Ok(users);
        }



        [Authorize]
        [HttpGet("check")]
        public async Task<ActionResult<IEnumerable<ApplicationDto>>> TestCall()
        {
            var apps = await _userRepository.GetApplicationsAsync();
                        return Ok(apps);
        }

        [Authorize]
        [HttpGet("check/{id}")]
        public async Task<ActionResult<ApplicationDto>> TestCallId(int id)
        {
            return await _userRepository.GetApplicationByIdAsync(id);
            
        }

        // [Authorize]
        // [HttpGet("{id}")]
        // public async Task<ActionResult<AppUser>> GetUserById(int id)
        // {
        //     return await _userRepository.GetUserByIdAsync(id);

        // }

        [Authorize]
        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUserByUsername(string username)
        {
            return await _userRepository.GetMemberAsync(username);


        }

    }
}