using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

using Model.Identity;

namespace Database.Contexts
{
    public partial class OurGardenContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
    {
        public OurGardenContext(DbContextOptions<OurGardenContext> options) : base(options) { }

        static private object lockObj = new object();

        //public DbSet<Post> Post { get; set; }
        //public DbSet<Comment> Comment { get; set; }
        //public DbSet<Group> Group { get; set; }
        //public DbSet<Children> Children { get; set; }
        //public DbSet<ChildrenInformation> ChildrenInformation { get; set; }
        //public DbSet<Medicament> Medicament { get; set; }
        //public DbSet<Visitation> Visitation { get; set; }
        //public DbSet<HealthGroup> HealthGroup { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ApplicationUser>().ToTable("ApplicationUser");

            //modelBuilder.Entity<Comment>()
            //    .HasOne(x => x.User)
            //    .WithMany()
            //    .OnDelete(DeleteBehavior.Restrict);

            //modelBuilder.Entity<HealthGroup>().HasData(
            //    new HealthGroup() { HealthGroupId = 1, Number = 1, Description = "Группа здоровья I" },
            //    new HealthGroup() { HealthGroupId = 2, Number = 2, Description = "Группа здоровья II" },
            //    new HealthGroup() { HealthGroupId = 3, Number = 3, Description = "Группа здоровья III" },
            //    new HealthGroup() { HealthGroupId = 4, Number = 4, Description = "Группа здоровья IV" },
            //    new HealthGroup() { HealthGroupId = 5, Number = 5, Description = "Группа здоровья V" });

            //modelBuilder.Entity<ChildrenInformation>()
            //    .HasOne(x => x.HealthGroup)
            //    .WithMany()
            //    .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
