using Microsoft.EntityFrameworkCore;
using RestaurantApp.Models;

namespace RestaurantApp.Contexts
{
    public partial class DatabaseContext : DbContext
    {
        public DatabaseContext()
        {
        }
        public DatabaseContext(DbContextOptions<DatabaseContext> options)
            : base(options)
        {
            //this.Database.EnsureCreated();
        }
        public virtual DbSet<Game>? Games { get; set; }
        public virtual DbSet<GameCharacter>? GameCharacters { get; set; }
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

    }
}
