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
    public class AccountController : BaseApiController
    {
        //public string userEmail { get; set; }

        private string userEmail;
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        public AccountController(DataContext context, ITokenService tokenService, IMapper mapper)
        {
            _mapper = mapper;
            _tokenService = tokenService;
            _context = context;
        }

        //public AccountController () {}

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {

            if (await UserExists(registerDto.Email)) return BadRequest("Email already exists");

            var user = _mapper.Map<AppUser>(registerDto);

            using var hmac = new HMACSHA512();

            user.UserName = registerDto.Email.ToLower();
            user.UserTypeId = 3;
            //user.Year = registerDto.Year;
            registerDto.DateOfBirth.ToString("dd/mm/yyyy");
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password));
            user.PasswordSalt = hmac.Key;

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserDto
            {
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user),
                FirstName = user.FirstName,
                LastName = user.LastName,
                UserType = user.UserTypeId,
                CheckEmail = user.Email,
                CheckApplicationStatus = user.ApplicationSubmitted
            };
        }

        [HttpPost("addTutor")]
        public async Task<ActionResult<UserDto>> AddTutor(RegisterDto registerDto)
        {

            if (await UserExists(registerDto.Email)) return BadRequest("Email already exists");

            var user = _mapper.Map<AppUser>(registerDto);

            using var hmac = new HMACSHA512();

            user.UserName = registerDto.Email.ToLower();
            user.UserTypeId = 2;
            user.StudentId = "N/A";
            registerDto.DateOfBirth.ToString("dd/mm/yyyy");
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password));
            user.PasswordSalt = hmac.Key;

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserDto
            {
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user),
                FirstName = user.FirstName,
                LastName = user.LastName,
                UserType = user.UserTypeId,
                CheckEmail = user.Email,
                CheckApplicationStatus = user.ApplicationSubmitted
            };
        }


        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == loginDto.UserName);
            if (user == null) return Unauthorized("Invalid Username");
            
            //int i = 2;
            //CurrentUser(user.Email.ToLower());

            //userEmail = user.Email.ToLower();

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password");
            }

            return new UserDto
            {
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user),
                FirstName = user.FirstName,
                LastName = user.LastName,
                UserType = user.UserTypeId,
                CheckEmail = user.Email,
                CheckApplicationStatus = user.ApplicationSubmitted
            };
        }

        // [HttpPost("createApplication")]
        // public async Task<ActionResult<UserDto>> Application(CreateApplicationDto applicationDto)
        // {
        //      //var acc = new AccountController(_context, _tokenService, _mapper);
                
        //        var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == applicationDto.UserName);
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
        //         CheckApplicationStatus = true
        //     };
        // }


        private async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
        // private async Task<string> CurrentUser(string username)
        // {
        //     var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == username);


        //    // return await _context.Users.AnyAsync(x => x.UserName == username.ToLower());
        // }

        public string CurrentUser(string username)
        {
            return userEmail = username;
        }

        public string getCurrentUser()
        {
            return userEmail;
        }
    }
}