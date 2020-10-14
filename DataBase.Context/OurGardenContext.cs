using DataBase.Abstraction.Identity;
using DataBase.Abstraction.Model;

using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

using PhotoService.Abstraction.Model;

namespace DataBase.Context
{
    public partial class OurGardenContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
    {
        public OurGardenContext(DbContextOptions<OurGardenContext> options) : base(options) { }

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
        public DbSet<PageInfo> PageInfo { get; set; }

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

            #region OrderStatus default entity

            modelBuilder.Entity<OrderStatus>().HasData(
                new OrderStatus() { StatusId = (int)OrderStatusEnum.New, Name = "Новый заказ"},
                new OrderStatus() { StatusId = (int)OrderStatusEnum.Confirmed, Name = "Заказ подтверждён"},
                new OrderStatus() { StatusId = (int)OrderStatusEnum.Sended, Name = "Заказ отправлен" },
                new OrderStatus() { StatusId = (int)OrderStatusEnum.WaitClient, Name = "Заказ ожидает получателя" },
                new OrderStatus() { StatusId = (int)OrderStatusEnum.Closed, Name = "Заказ закрыт"},
                new OrderStatus() { StatusId = (int)OrderStatusEnum.Canceled, Name = "Заказ отменён"});

            #endregion

            #region PageInfo default entity

            modelBuilder
                .Entity<PageInfo>()
                .HasData(
                    new PageInfo() {
                        PageInfoId = Abstraction.Model.PageInfo.HomePageId,
                        Alias = "Главная",
                        Description = @"<h1><strong>Cемена и посадочный материал в Туле</strong></h1><p>Предлагаем широкий ассортимент продукции для сада и огорода. Здесь вы найдете саженцы плодовых и декоративных растений, гарантированно жизнеспособных и высокого качества. В компании «Наш Сад» в Туле можно купить семена и посадочный материал оптом и в розницу. Вырастить и увеличить урожай помогут специализированные грунты. Наша продукция подходит для украшения загородных участков, проведения ландшафтных работ, городского озеленения. Компания постоянно работает над расширением ассортимента сортов и видов растений.</p><h2><strong>Ландшафтный дизайн, омолаживающая обрезка и уход</strong></h2><p>Предлагаем услуги по ландшафтному дизайну и уходу за садом. Создаем сады любой сложности, адаптированные под российский климат и сохраняющие декоративность круглый год. Воплощаем самые смелые идеи. Берем на себя все работы: создание проекта, благоустройство участка, озеленение, а также последующий уход за растениями. Стрижем, обрезаем растения, ухаживаем за газоном, укрываем на зиму, боремся с вредителями. Омолодим и облагородим старый сад.</p><h3><strong>Где купить семена оптом</strong></h3><p>Если вы ищете, где купить посадочный материал, семена, заказать услуги по уходу за растениями, обращайтесь в компанию «Наш Сад». Наши сотрудники сделают все, чтобы ваш дачный или приусадебный участок круглый год радовал богатыми урожаями и неповторимым ландшафтом. Приглашаем к сотрудничеству оптовых покупателей.</p>",
                        SeoTitle = "Купить семена, посадочный материал в Туле",
                        SeoDescription = "Купить семена в садовом центре «Наш сад» в Туле оптом и в розницу. Посадочный материал, грунты высокого качества. Ландшафтный дизайн и уход за растениями. Омоложение старых садов.",
                        SeoKeywords = "купить семена в туле, оптом, где купить"
                    },
                    new PageInfo()
                    {
                        PageInfoId = Abstraction.Model.PageInfo.DesignPageId,
                        Alias = "Ландшафтный дизайн",
                        Description = @"<h1><strong>Ландшафтный дизайн</strong></h1><p><strong>Ландшафтный дизайн участка — </strong>это настоящее междисциплинарное искусство, сочетающее в себе проектирование, архитектурные решения и багаж знаний в области растениеводства. Ландшафтный дизайн применяется для облагораживания территории<strong> дачных участков, </strong>парков, скверов, пешеходных зон. Заказывать разработку проекта ландшафтного дизайна лучше всего на начальном этапе строительства<strong> загородного дома </strong>или создания парка.</p>{{gallery=Ландшафтный дизайн}}<p>Квалифицированный и опытный ландшафтный дизайнер никогда не работает один — созданием<strong> декоративного озеленения </strong>должна заниматься команда работников: биологи, дизайнеры и строители, иначе добиться оптимального соседства для растений невозможно.</p><h2><strong>Этапы организации гармоничного ландшафтного дизайна участка</strong></h2><p>Комплексная работа по<strong> благоустройству </strong>участка придаст ему гармоничный вид: растения будут красиво сочетаться и прекрасно уживаться друг с другом, а все системы — бесперебойно функционировать. Для этого специалисты прибегают к тщательному поэтапному изучению участка:</p><ul><li>Для подбора растений они собирают данные о типе почвы, освещенности и направления движения ветра.</li><li>Определяют расположение коммуникаций, чтобы избежать их повреждения.</li><li>Совместно с клиентом составляют проекта: утверждают функциональные зоны, дорожки, перечень растений, их местоположение на участке, список необходимые технических элементов.</li><li>Подготавливают почву для<strong> озеленения участка </strong>, прокладываю труб, монтажу дренажных систем и систем автоматического полива, а также устанавливают беседки, мангала, искусственный водоем, цветник и многое другое.</li></ul><p><strong>Заказать ландшафтный дизайн под ключ </strong>гораздо выгоднее, чем выбрать отдельные элементы.</p><h3><strong>Ландшафтный дизайн в Туле</strong></h3><p>Заказать<strong> ландшафтный дизайн в Туле </strong>можно у специалистов компании «Наш Сад». Мы разрабатываем проекты быстро и недорого, имеем многолетний опыт проведения работ по<strong> озеленению участков </strong>любой сложности. Мы предоставляем портфолио работ и заключаем договор, точно соблюдая все пункты и срок сдачи объекта.</p><p>Звоните по телефону {{phone}} и заказывайте<strong> ландшафтное озеленение территории в Туле. </strong>Также вы можете задать вопросы в чате обратной связи на сайте.</p>",
                        SeoTitle = "Ландшафтный дизайн участка и озеленение под ключ в Туле",
                        SeoDescription = "Ландшафтный дизайн участка от мастеров фирмы «Наш Сад»: мы занимаемся облагораживанием и озеленением дачных, приусадебных, садовых участков любой сложности. Работаем под ключ.",
                        SeoKeywords = "ландшафтный, дизайн, тула, участок, озеленение"
                    }
                );

            #endregion

            #region Default column values

            modelBuilder.Entity<Category>()
                .Property(x => x.IsVisible)
                .HasDefaultValue(true);

            modelBuilder.Entity<Subcategory>()
                .Property(x => x.IsVisible)
                .HasDefaultValue(true);

            modelBuilder.Entity<Product>()
                .Property(x => x.IsVisible)
                .HasDefaultValue(true);

            modelBuilder.Entity<Client>()
                .Property(x => x.IsIncludeInMailing)
                .HasDefaultValue(true);

            #endregion
        }
    }
}
