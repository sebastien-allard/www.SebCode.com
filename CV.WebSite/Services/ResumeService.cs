using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using CV.Data;
using CV.WebSite.Models;

namespace CV.WebSite.Services
{
    public class ResumeService : IResumeService
    {
        private readonly ILogger<ResumeService> _logger;
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _dbContext;


        public ResumeService(ILogger<ResumeService> logger, IMapper mapper, ApplicationDbContext dbContext)
        {
            _logger = logger;
            _mapper = mapper;
            _dbContext = dbContext;
        }

        public async Task<Resume> GetResumeAsync(string language)
        {
            var dto = await _dbContext.Resumes
                .Include($"{nameof(Data.Models.Resume.Jobs)}.{nameof(Data.Models.Job.Achievements)}")
                .Include($"{nameof(Data.Models.Resume.Technologies)}.{nameof(Data.Models.Technology.Children)}.{nameof(Data.Models.Technology.Children)}")
                .Include($"{nameof(Data.Models.Resume.Trainings)}.{nameof(Data.Models.Training.Sessions)}")
                .FirstOrDefaultAsync(x => x.Language == language);
            var result = _mapper.Map<Resume>(dto);
            return result;
        }

        public IQueryable<Job> GetJobs(string language)
        {
            try
            {
                var dto = _dbContext.Jobs
                    .Where(x => x.Resume.Language == language)
                    .Include($"{nameof(Data.Models.Job.Achievements)}")
                    .OrderByDescending(x => x.StartDate);

                var result = dto.ProjectTo<Job>(_mapper.ConfigurationProvider);
                return result;
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error getting jobs from database...");
                throw e;
            }
        }

        public async Task<int> AddJobAsync(string language, Job job)
        {
            var dto = _mapper.Map<CV.Data.Models.Job>(job);
            var resume = _dbContext.Resumes
                //.Include($"{nameof(Data.Models.Resume.Jobs)}")
                .First(x => x.Language == language);

            dto.ResumeId = resume.Id;

            _dbContext.Jobs.Add(dto);
            await _dbContext.SaveChangesAsync();
            return dto.Id;
        }

        public async Task DeleteJobAsync(string language, int id)
        {
            var dto = _dbContext.Jobs.First(x => x.Id == id);
            _dbContext.Remove(dto);
            await _dbContext.SaveChangesAsync();
        }


        public Task SaveJobAsync(string language, Job job)
        {
            var dto = _dbContext.Jobs
                .Include($"{nameof(Data.Models.Job.Achievements)}")
                .First(x => x.Id == job.Id);

            _mapper.Map(job, dto);

            // Delete removed achievementss
            foreach (var a in dto.Achievements)
            {
                if (!job.Achievements.Any(j => j.Id == a.Id))
                    _dbContext.Remove(a);
            }

            // Modify changed achievements
            foreach (var a in dto.Achievements)
            {
                var src = job.Achievements.FirstOrDefault(j => j.Id == a.Id);
                if (src != null)
                {
                    a.Order = src.Order;
                    a.Title = src.Title;
                    a.Description = src.Description;
                }
            }

            // Add new achievements
            foreach (var src in job.Achievements)
            {
                if (!dto.Achievements.Any(j => j.Id == src.Id))
                {
                    dto.Achievements.Add(new Data.Models.Achievement()
                    {
                        Id = 0,
                        Description = src.Description,
                        Order = src.Order,
                        Title = src.Title
                    });
                }
            }

            return _dbContext.SaveChangesAsync();
        }

        public IQueryable<Training> GetTrainings(string language)
        {
            try
            {
                var dto = _dbContext.Trainings
                    .Where(x => x.Resume.Language == language)
                    .Include($"{nameof(Data.Models.Training.Sessions)}")
                    .OrderByDescending(x => x.StartDate);

                var result = dto.ProjectTo<Training>(_mapper.ConfigurationProvider);
                return result;
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error getting trainings from database...");
                throw e;
            }

        }

        public async Task<int> AddTrainingAsync(string language, Training training)
        {
            var dto = _mapper.Map<CV.Data.Models.Training>(training);
            var resume = _dbContext.Resumes
                //.Include($"{nameof(Data.Models.Resume.Trainings)}")
                .First(x => x.Language == language);

            dto.ResumeId = resume.Id;

            _dbContext.Trainings.Add(dto);
            await _dbContext.SaveChangesAsync();
            return dto.Id;
        }

        public async Task DeleteTrainingAsync(string language, int id)
        {
            var dto = _dbContext.Trainings.First(x => x.Id == id);
            _dbContext.Remove(dto);
            await _dbContext.SaveChangesAsync();
        }

        public Task SaveTrainingAsync(string language, Training training)
        {
            var dto = _dbContext.Trainings
                .Include($"{nameof(Data.Models.Training.Sessions)}")
                .First(x => x.Id == training.Id);

            _mapper.Map(training, dto);

            // Delete removed sessions
            foreach (var a in dto.Sessions)
            {
                if (!training.Sessions.Any(t => t.Id == a.Id))
                    _dbContext.Remove(a);
            }

            // Modify changed sessions
            foreach (var a in dto.Sessions)
            {
                var src = training.Sessions.FirstOrDefault(t => t.Id == a.Id);
                if (src != null)
                {
                    a.Order = src.Order;
                    a.Title = src.Title;
                    a.Description = src.Description;
                }
            }

            // Add new sessions
            foreach (var src in training.Sessions)
            {
                if (!dto.Sessions.Any(t => t.Id == src.Id))
                {
                    dto.Sessions.Add(new Data.Models.Session()
                    {
                        Id = 0,
                        Description = src.Description,
                        //Order = src.Order,
                        Title = src.Title
                    });
                }
            }

            return _dbContext.SaveChangesAsync();
        }


        public IQueryable<Technology> GetTechnologies(string language)
        {
            try
            {
                var dto = _dbContext.Technologies
                    .Where(x => x.Resume.Language == language)
                    .Include($"{nameof(Data.Models.Technology.Children)}.{nameof(Data.Models.Technology.Children)}.{nameof(Data.Models.Technology.Children)}.{nameof(Data.Models.Technology.Children)}")
                    .Include($"{nameof(Data.Models.Technology.Parent)}.{nameof(Data.Models.Technology.Parent)}.{nameof(Data.Models.Technology.Resume)}")
                    .OrderBy(x => x.Order);

                // NOTE: ProjectTo() is ignoring MaxDepth()
                //var result = dto.ProjectTo<Technology>(_mapper.ConfigurationProvider);
                var result = _mapper.Map<ICollection<Technology>>(dto.ToArray());

                OrderTechnologies(result);

                return result.AsQueryable();
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error getting technologies from database...");
                throw e;
            }
        }

        private void OrderTechnologies(ICollection<Technology> technologies)
        {
            foreach (var technology in technologies)
            {
                if (technology.Children != null)
                {
                    technology.Children = technology.Children.OrderBy(x => x.Order).ToArray();
                    OrderTechnologies(technology.Children);
                }
            }
        }

        public async Task DeleteTechnologyAsync(string language, int id)
        {
            var dto = _dbContext.Technologies.First(x => x.Id == id);
            _dbContext.Remove(dto);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<int> AddTechnologyAsync(string language, Technology technology)
        {
            var dto = _mapper.Map<CV.Data.Models.Technology>(technology);
            var parentDto = _dbContext.Technologies
                .Include($"{nameof(Data.Models.Technology.Children)}")
                .First(x => x.Id == technology.ParentId);
            parentDto.Children.Add(dto);
            await _dbContext.SaveChangesAsync();
            return dto.Id;
        }

        public async Task SaveTechnologyAsync(string language, Technology technology)
        {
            var dto = _dbContext.Technologies
                .Include($"{nameof(Data.Models.Technology.Children)}")
                .First(x => x.Id == technology.Id);

            //if (dto.ParentId.HasValue && dto.ParentId.Value != technology.ParentId)
            //{ 
            //    // Move
            //    var oldParentDto = _dbContext.Technologies
            //        .Include($"{nameof(Data.Models.Technology.Children)}")
            //        .First(x => x.Id == dto.Parent.Id);

            //    oldParentDto.Children.Remove(dto);

            //    var newParentDto = _dbContext.Technologies
            //        .Include($"{nameof(Data.Models.Technology.Children)}")
            //        .First(x => x.Id == technology.ParentId);

            //    newParentDto.Children.Add(dto);
            //}

            _mapper.Map(technology, dto);

            if (dto.ParentId == 0)
            {
                // Root Category, attach to Resume
                dto.ParentId = null;
                dto.Parent = null;
                dto.ResumeId = _dbContext.Resumes.First(x => x.Language == language).Id;
            }
            else
            {
                dto.ResumeId = null;
                dto.Resume = null;
            }

            await _dbContext.SaveChangesAsync();
        }
    }
}
