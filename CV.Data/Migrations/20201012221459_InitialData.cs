using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CV.Data.Migrations
{
    public class AppSettings
    {
        public ConnectionStrings ConnectionStrings { get; set; }
    }

    public class ConnectionStrings
    {
        public string DefaultConnection { get; set; }
    }

    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20201012221459_InitialData")]
    public class InitialData : Migration
    {
#if DEBUG
        private const string AppSettingsFilePath =
            //*/
            "appsettings.Development.json";
            /*/ 
            "appsettings.json";
            //*/
#else
        private const string AppSettingsFilePath = "appsettings.json";
#endif

        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "3.1.8");
        }

        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var configuration = GetConfigurationAsync().Result;

            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
            optionsBuilder.UseSqlServer(configuration.ConnectionStrings.DefaultConnection);

            using var dbContext = new ApplicationDbContext(optionsBuilder.Options);
            LoadResume(dbContext, "fr");
            LoadResume(dbContext, "en");
            dbContext.SaveChanges();
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            throw new NotImplementedException();
        }

        // TODO: Read configuration properly 
        private async Task<AppSettings> GetConfigurationAsync()
        {
            using var stream = new FileStream(AppSettingsFilePath, FileMode.Open, FileAccess.Read, FileShare.Read, 4096, true);
            var options = new JsonSerializerOptions();
            return await JsonSerializer.DeserializeAsync<AppSettings>(stream, options);
        }

        private void LoadResume(ApplicationDbContext dbContext, string language)
        {
            var resume = GetResumeAsync(language).Result;
            CleanIds(resume);
            OrderTechnologies(resume.Technologies);
            OrderAchievements(resume.Jobs);
            OrderSessions(resume.Trainings);

            dbContext.Resumes.Add(resume);
        }

        private void OrderSessions(ICollection<Models.Training> trainings)
        {
            foreach (var training in trainings)
            {
                var index = 0;
                foreach (var session in training.Sessions)
                {
                    session.Order = index++;
                }
            }
        }

        private void OrderAchievements(ICollection<Models.Job> jobs)
        {
            foreach (var job in jobs)
            {
                var index = 0;
                foreach (var achievement in job.Achievements)
                {
                    achievement.Order = index++;
                }
            }
        }

        private void OrderTechnologies(ICollection<Models.Technology> technologies)
        {
            if (technologies == null)
                return;

            var index = 0;
            foreach (var technology in technologies)
            {
                technology.Order = index;
                index++;

                if (technology.Children != null)
                    OrderTechnologies(technology.Children);
            }
        }

        private async Task<Models.Resume> GetResumeAsync(string language)
        {
            using var stream = new FileStream($"App_Data\\Resume.{language}.json", FileMode.Open, FileAccess.Read, FileShare.Read, 4096, true);
            var options = new JsonSerializerOptions()
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };
            return await JsonSerializer.DeserializeAsync<Models.Resume>(stream, options);
        }

        private void CleanIds(Models.Resume resume)
        {
            resume.Id = 0;
            foreach (var technology in resume.Technologies)
            {
                CleanId(technology);
            }
            foreach (var job in resume.Jobs)
            {
                job.Id = 0;
                if (job.Achievements != null)
                {
                    foreach (var achievement in job.Achievements)
                    {
                        achievement.Id = 0;
                    }
                }
            }
            foreach (var training in resume.Trainings)
            {
                training.Id = 0;
                if (training.Sessions != null)
                {
                    foreach (var session in training.Sessions)
                    {
                        session.Id = 0;
                    }
                }
            }
        }

        private void CleanId(Models.Technology technology)
        {
            technology.Id = 0;
            if (technology.Children != null)
            {
                foreach (var child in technology.Children)
                {
                    CleanId(child);
                }
            }
        }
    }
}
