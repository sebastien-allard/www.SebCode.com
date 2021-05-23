using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CV.WebSite.Models;

namespace CV.WebSite.App_Start
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            // FROM Website.Models TO Data.Models -----------------------------
            CreateMap<Resume, CV.Data.Models.Resume>()
                .ForMember(dest => dest.Id, opt => opt.Ignore());

            CreateMap<Job, CV.Data.Models.Job>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.Achievements, opt => opt.Ignore());

            CreateMap<Technology, CV.Data.Models.Technology>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                // NOTE: Don't map navigation properties
                .ForMember(dest => dest.Children, opt => opt.Ignore())
                .ForMember(dest => dest.Parent, opt => opt.Ignore());

            CreateMap<Training, CV.Data.Models.Training>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.Sessions, opt => opt.Ignore());

            CreateMap<Session, CV.Data.Models.Session>()
                .ForMember(dest => dest.Id, opt => opt.Ignore());

            CreateMap<Achievement, CV.Data.Models.Achievement>()
                .ForMember(dest => dest.Id, opt => opt.Ignore());

            // FROM Data.Models TO Website.Models -----------------------------
            CreateMap<CV.Data.Models.Resume, Resume>();
            CreateMap<CV.Data.Models.Job, Job>();
            CreateMap<CV.Data.Models.Technology, Technology>()
                .ForMember(dest => dest.ParentId, opt => opt.Ignore())
                .MaxDepth(10);
            CreateMap<CV.Data.Models.Training, Training>();
            CreateMap<CV.Data.Models.Session, Session>();
            CreateMap<CV.Data.Models.Achievement, Achievement>();
        }
    }
}
