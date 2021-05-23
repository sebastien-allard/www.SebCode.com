using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using CV.WebSite.Models;

namespace CV.WebSite.Services
{
    public class ResumeJsonService : IResumeService
    {
        private readonly ILogger<ResumeJsonService> _logger;


        public ResumeJsonService(ILogger<ResumeJsonService> logger)
        {
            _logger = logger;
        }

        public async Task<Resume> GetResumeAsync(string language)
        {
            try
            {
                using var stream = new FileStream($"App_Data\\Resume.{language}.json", FileMode.Open, FileAccess.Read, FileShare.Read, 4096, true);
                var options = new JsonSerializerOptions()
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                };
                return await JsonSerializer.DeserializeAsync<Resume>(stream, options);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Erreur de lecture du CV");
                throw;
            }
        }

        private bool DeleteTechnologyInternal(IList<Technology> technologies, int id)
        {
            var found = technologies.Where(x => x.Id == id).FirstOrDefault();

            if (found != null)
            {
                technologies.Remove(found);
                return true;
            } 
            else
            {
                foreach (var technology in technologies.Where(x => x.Children != null && x.Children.Any()))
                {
                    var isFound = DeleteTechnologyInternal(technology.Children, id);
                    if (isFound) 
                        return true;
                }
            }

            return false;
        }

        public async Task DeleteTechnologyAsync(string language, int id)
        {
            var cv = await GetResumeAsync(language);

            var found = DeleteTechnologyInternal(cv.Technologies, id);

            if (!found)
                throw new KeyNotFoundException();

            // save cv
        }

        public Task<int> AddTechnologyAsync(string language, Technology technology)
        {
            throw new NotImplementedException();
        }

        public IQueryable<Technology> GetTechnologies(string language)
        {
            return GetResumeAsync(language).Result.Technologies.AsQueryable();
        }

        public IQueryable<Job> GetJobs(string language)
        {
            return GetResumeAsync(language).Result.Jobs.AsQueryable();
        }

        public IQueryable<Training> GetTrainings(string language)
        {
            return GetResumeAsync(language).Result.Trainings.AsQueryable();
        }

        public Task SaveTechnologyAsync(string language, Technology technology)
        {
            throw new NotImplementedException();
        }

        public Task<int> AddJobAsync(string language, Job job)
        {
            throw new NotImplementedException();
        }

        public Task DeleteJobAsync(string language, int id)
        {
            throw new NotImplementedException();
        }

        public Task SaveJobAsync(string language, Job job)
        {
            throw new NotImplementedException();
        }

        public Task<int> AddTrainingAsync(string language, Training training)
        {
            throw new NotImplementedException();
        }

        public Task DeleteTrainingAsync(string language, int id)
        {
            throw new NotImplementedException();
        }

        public Task SaveTrainingAsync(string language, Training training)
        {
            throw new NotImplementedException();
        }
    }
}
