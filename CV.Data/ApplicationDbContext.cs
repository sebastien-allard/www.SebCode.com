using Microsoft.EntityFrameworkCore;
using CV.Data.Models;

namespace CV.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Resume> Resumes { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<Achievement> Achievements { get; set; }
        public DbSet<Session> Sessions { get; set; }
        public DbSet<Technology> Technologies { get; set; }
        public DbSet<Training> Trainings { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Achievement>()
                .HasOne(e => e.Job)
                .WithMany(e => e.Achievements)
                .OnDelete(DeleteBehavior.Cascade);

        }
    }
}
