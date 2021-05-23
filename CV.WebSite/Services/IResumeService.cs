using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CV.WebSite.Models;

namespace CV.WebSite.Services
{
    public interface IResumeService
    {
        public Task<Resume> GetResumeAsync(string language);

        IQueryable<Technology> GetTechnologies(string language);
        Task<int> AddTechnologyAsync(string language, Technology technology);
        Task SaveTechnologyAsync(string language, Technology technology);
        Task DeleteTechnologyAsync(string language, int id);


        IQueryable<Training> GetTrainings(string language);
        Task<int> AddTrainingAsync(string language, Training training);
        Task DeleteTrainingAsync(string language, int id);
        Task SaveTrainingAsync(string language, Training training);


        IQueryable<Job> GetJobs(string language);
        Task<int> AddJobAsync(string language, Job job);
        Task DeleteJobAsync(string language, int id);
        Task SaveJobAsync(string language, Job job);
    }
}