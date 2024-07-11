using Microsoft.EntityFrameworkCore;

namespace API.Models
{
    public class AppDbContext : DbContext
    {
        public DbSet<Aluno> Alunos { get; set; }
        public DbSet<IMC> IMCs { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=victor.db");
        }
    }
}