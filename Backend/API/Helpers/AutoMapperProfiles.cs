using System.Linq;
using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>()
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src 
                    => src.Photos.FirstOrDefault(x => x.IsMain).Url))
                    .ForMember(dest => dest.UserType, opt => opt.MapFrom(src
                    => src.UserType.Name))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src 
                    => src.DateOfBirth.CalculateAge()));

            CreateMap<Photo, PhotoDto>();
            CreateMap<RegisterDto, AppUser>();
         CreateMap<CreateApplicationDto, ApplicationData>();
         CreateMap<ApplicationDto, ApplicationData>();
         CreateMap<ApplicationData, ApplicationDto>();
        }
    }
}