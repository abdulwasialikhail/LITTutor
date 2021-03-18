using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ApplicationController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        public ApplicationController(IUserRepository userRepository, DataContext context, ITokenService tokenService, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _tokenService = tokenService;
            _context = context;
        }

        // [HttpPost("createApplication")]
        // public async Task<ActionResult<UserDto>> Application(CreateApplicationDto applicationDto)
        // {

        //     UserDto u = new UserDto();
        //     var name = u.UserName;

        //     var nn = new AccountController(_context, _tokenService, _mapper).getCurrentUser();

        //     var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == nn.);
        //     // if (await UserExists(registerDto.Email)) return BadRequest("Email already exists");

        //     var application = _mapper.Map<ApplicationData>(applicationDto);

        //     application.Issue = applicationDto.Issue;
        //     application.Course = applicationDto.Course;
        //     application.ApplicationStatusId = 2;
        //     application.AppUserId = user.Id;
        //     user.ApplicationSubmitted = true;

        //     _context.Applications.Add(application);
        //     await _context.SaveChangesAsync();

        //     // return new CreateApplicationDto
        //     // {
        //     //     Issue = application.Issue,
        //     //     Course = application.Course,
        //     //     ApplicationStatusId = application.ApplicationStatusId,
        //     //     AppUserId = application.AppUserId

        //     // };
        //     return new UserDto
        //     {
        //         UserName = user.UserName,
        //         Token = _tokenService.CreateToken(user),
        //         FirstName = user.FirstName,
        //         LastName = user.LastName,
        //         UserType = user.UserTypeId,
        //         CheckEmail = user.Email,
        //         CheckApplicationStatus = user.ApplicationSubmitted
        //     };
        // }

        [HttpPost("createApplication")]
        public async Task<ActionResult<UserDto>> Application(CreateApplicationDto applicationDto)
        {
            //var acc = new AccountController(_context, _tokenService, _mapper);

            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == applicationDto.UserName);
            // if (await UserExists(registerDto.Email)) return BadRequest("Email already exists");

            var application = _mapper.Map<ApplicationData>(applicationDto);

            application.Issue = applicationDto.Issue;
            application.Course = applicationDto.Course;
            application.ApplicationStatusId = 2;
            application.AppUserId = user.Id;
            user.ApplicationSubmitted = true;

            _context.Applications.Add(application);
            await _context.SaveChangesAsync();

            // return new CreateApplicationDto
            // {
            //     Issue = application.Issue,
            //     Course = application.Course,
            //     ApplicationStatusId = application.ApplicationStatusId,
            //     AppUserId = application.AppUserId

            // };
            return new UserDto
            {
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user),
                FirstName = user.FirstName,
                LastName = user.LastName,
                UserType = user.UserTypeId,
                CheckEmail = user.Email,
                CheckApplicationStatus = true
            };
        }

        [HttpPut("approve")]
        public async Task<ActionResult> ApplicationApproval(CreateApplicationDto applicationDto)
        {
            // APPLICATION DTO SHOULD MATCH EXACTLY AS CLIENT SIDE

           // string email = "aoife@gmail.com";
          // int inputmail = 4;
            //var acc = new AccountController(_context, _tokenService, _mapper);

            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == applicationDto.UserName);
            var app = await _context.Applications.SingleOrDefaultAsync(x => x.AppUserId == user.Id);
            user.FirstName = "Aoife";
            // if (await UserExists(registerDto.Email)) return BadRequest("Email already exists");

           // ApplicationDto applicationDto = new ApplicationDto();

            // var application = _mapper.Map<ApplicationData>(applicationDto);


            //application.ApplicationStatusId = 1;
           // application.Id = user.Id;

            user.ApplicationSubmitted = false;
            app.ApplicationStatusId = 1;

            // _context.Applications.Add(application);
            await _context.SaveChangesAsync();
            // _userRepository.UpdateApplication(application);

            // return new CreateApplicationDto
            // {
            //     Issue = application.Issue,
            //     Course = application.Course,
            //     ApplicationStatusId = application.ApplicationStatusId,
            //     AppUserId = application.AppUserId

            // };

            return Ok();
        }


    }
}