using Application.Comments;
using Application.Requests;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Request, Request>();
            CreateMap<Request, RequestDto>()
                .ForMember(d => d.RequesterUserName,
                    o => o.MapFrom(s => s.Users.FirstOrDefault(x => x.IsRequester).AppUser.UserName));
            CreateMap<UserRequest, ParticipantDto>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.UserType, o => o.MapFrom(s => s.AppUser.UserType))
                .ForMember(d=>d.Image, o=>o.MapFrom(s=>s.AppUser.MainPhoto));

            CreateMap<AppUser, Profiles.Profile>()
                .ForMember(d=>d.Image, o=>o.MapFrom(s=>s.MainPhoto));

            CreateMap<Comment, CommentDTO>()
                .ForMember(d=>d.DisplayName, o=>o.MapFrom(s=>s.Author.DisplayName))
                .ForMember(d=>d.UserName, o=>o.MapFrom(s=>s.Author.UserName))
                .ForMember(d=>d.Image, o=>o.MapFrom(s=>s.Author.MainPhoto));
        }
    }
}