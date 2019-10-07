using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

using Model.DB;
using Model.Identity;

namespace Database.Contexts
{
    public partial class OurGardenContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
    {
        public OurGardenContext(DbContextOptions<OurGardenContext> options) : base(options) { }

        static private object lockObj = new object();

        public DbSet<Category> Category { get; set; }
        public DbSet<Gallery> Gallery { get; set; }
        public DbSet<News> News { get; set; }
        public DbSet<Order> Order { get; set; }
        public DbSet<OrderPosition> OrderPosition { get; set; }
        public DbSet<Photo> Photo { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<OrderStatus> Status { get; set; }
        public DbSet<Subcategory> Subcategory { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Video> Video { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ApplicationUser>()
                .ToTable("ApplicationUser");

            modelBuilder.Entity<Subcategory>()
                .HasKey(x => new {
                    x.SubcategoryId,
                    x.CategoryId
                });
            modelBuilder.Entity<Product>()
                .HasKey(x => new {
                    x.ProductId,
                    x.SubcategoryId,
                    x.CategoryId
                });

            modelBuilder.Entity<OrderPosition>()
                .HasOne(x => x.Product)
                .WithMany()
                .HasForeignKey(x => new
                {
                    x.ProductId,
                    x.SubcategoryId,
                    x.CategoryId,
                })
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<OrderStatus>().HasData(
                new OrderStatus() { StatusId = 1, Name = "Новый заказ"},
                new OrderStatus() { StatusId = 2, Name = "Заказ подтверждён"},
                new OrderStatus() { StatusId = 3, Name = "Заказ отправлен" },
                new OrderStatus() { StatusId = 4, Name = "Заказ ожидает получателя" },
                new OrderStatus() { StatusId = 5, Name = "Заказ закрыт"},
                new OrderStatus() { StatusId = -1, Name = "Заказ отменён"});

            modelBuilder.Entity<Category>()
                .Property(x => x.IsVisible)
                .HasDefaultValue(true);

            modelBuilder.Entity<Subcategory>()
                .Property(x => x.IsVisible)
                .HasDefaultValue(true);

            modelBuilder.Entity<Product>()
                .Property(x => x.IsVisible)
                .HasDefaultValue(true);
        }
    }
}
