using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class CadCliDataContext : DbContext
    {
        public DbSet<ClienteModel> Clientes { get; set; }

        public CadCliDataContext()
        {
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryDatabase("cadclidb");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ClienteModel>().HasData(
               new ClienteModel { Id = 1, Nome = "Fabiano", Idade = 42 },
               new ClienteModel { Id = 2, Nome = "Priscila", Idade = 43 },
               new ClienteModel { Id = 3, Nome = "Raphael", Idade = 22 },
               new ClienteModel { Id = 4, Nome = "Isabel", Idade = 63 }
            );
        }

    }

}