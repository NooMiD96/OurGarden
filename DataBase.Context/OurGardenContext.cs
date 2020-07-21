using DataBase.Abstraction.Identity;
using DataBase.Abstraction.Model;

using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

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
                        Description = @"<article class=""ant-typography content ourgarden-design grey-border white-background""><div class=""ant-typography""><h1 class=""ant-typography"">Cемена и посадочный материал в Туле</h1>Предлагаем широкий ассортимент продукции для сада и огорода. Здесь вы найдете саженцы плодовых и декоративных растений, гарантированно жизнеспособных и высокого качества. В компании «Наш Сад» в Туле можно купить семена и посадочный материал оптом и в розницу. Вырастить и увеличить урожай помогут специализированные грунты. Наша продукция подходит для украшения загородных участков, проведения ландшафтных работ, городского озеленения. Компания постоянно работает над расширением ассортимента сортов и видов растений.</div><div class=""ant-typography""><h2 class=""ant-typography"">Ландшафтный дизайн, омолаживающая обрезка и уход</h2>Предлагаем услуги по ландшафтному дизайну и уходу за садом. Создаем сады любой сложности, адаптированные под российский климат и сохраняющие декоративность круглый год. Воплощаем самые смелые идеи. Берем на себя все работы: создание проекта, благоустройство участка, озеленение, а также последующий уход за растениями. Стрижем, обрезаем растения, ухаживаем за газоном, укрываем на зиму, боремся с вредителями. Омолодим и облагородим старый сад.</div><div class=""ant-typography""><h2 class=""ant-typography"">Где купить семена оптом</h2>Если вы ищете, где купить посадочный материал, семена, заказать услуги по уходу за растениями, обращайтесь в компанию «Наш Сад». Наши сотрудники сделают все, чтобы ваш дачный или приусадебный участок круглый год радовал богатыми урожаями и неповторимым ландшафтом. Приглашаем к сотрудничеству оптовых покупателей.</div></article>",
                        SeoTitle = "Купить семена, посадочный материал в Туле",
                        SeoDescription = "Купить семена в садовом центре «Наш сад» в Туле оптом и в розницу. Посадочный материал, грунты высокого качества. Ландшафтный дизайн и уход за растениями. Омоложение старых садов.",
                        SeoKeywords = "купить семена в туле, оптом, где купить"
                    },
                    new PageInfo()
                    {
                        PageInfoId = Abstraction.Model.PageInfo.DesignPageId,
                        Alias = "Ландшафтный дизайн",
                        Description = @"<div><h1 class=""ant-typography"">Ландшафтный дизайн</h1><div class=""ant-typography""><span class=""ant-typography""><strong>Ландшафтный дизайн участка — </strong></span>это настоящее междисциплинарное искусство, сочетающее в себе проектирование, архитектурные решения и багаж знаний в области растениеводства. Ландшафтный дизайн применяется для облагораживания территории<span class=""ant-typography""><strong> дачных участков, </strong></span>парков, скверов, пешеходных зон. Заказывать разработку проекта ландшафтного дизайна лучше всего на начальном этапе строительства<span class=""ant-typography""><strong> загородного дома </strong></span>или создания парка.</div><div class=""ant-typography"">Квалифицированный и опытный ландшафтный дизайнер никогда не работает один — созданием<span class=""ant-typography""><strong> декоративного озеленения </strong></span>должна заниматься команда работников: биологи, дизайнеры и строители, иначе добиться оптимального соседства для растений невозможно.</div><h2 class=""ant-typography"">Этапы организации гармоничного ландшафтного дизайна участка</h2><div class=""ant-typography"">Комплексная работа по<span class=""ant-typography""><strong> благоустройству </strong></span>участка придаст ему гармоничный вид: растения будут красиво сочетаться и прекрасно уживаться друг с другом, а все системы — бесперебойно функционировать. Для этого специалисты прибегают к тщательному поэтапному изучению участка:</div><div class=""ant-typography""><ul><li>Для подбора растений они собирают данные о типе почвы, освещенности и направления движения ветра.</li><li>Определяют расположение коммуникаций, чтобы избежать их повреждения.</li><li>Совместно с клиентом составляют проекта: утверждают функциональные зоны, дорожки, перечень растений, их местоположение на участке, список необходимые технических элементов.</li><li>Подготавливают почву для<span class=""ant-typography""><strong> озеленения участка </strong></span>, прокладываю труб, монтажу дренажных систем и систем автоматического полива, а также устанавливают беседки, мангала, искусственный водоем, цветник и многое другое.</li></ul></div><div class=""ant-typography""><span class=""ant-typography""><strong>Заказать ландшафтный дизайн под ключ </strong></span>гораздо выгоднее, чем выбрать отдельные элементы.</div><h3 class=""ant-typography"">Ландшафтный дизайн в Туле</h3><div class=""ant-typography"">Заказать<span class=""ant-typography""><strong> ландшафтный дизайн в Туле </strong></span>можно у специалистов компании «Наш Сад». Мы разрабатываем проекты быстро и недорого, имеем многолетний опыт проведения работ по<span class=""ant-typography""><strong> озеленению участков </strong></span>любой сложности. Мы предоставляем портфолио работ и заключаем договор, точно соблюдая все пункты и срок сдачи объекта.</div><div class=""ant-typography"">Звоните по телефону<!-- --> <a class=""number-wrapper "" href=""tel:+79534343516""><span class=""text"">+7 (953) 43-43-516</span></a> <!-- -->и заказывайте<span class=""ant-typography""><strong> ландшафтное озеленение территории в Туле. </strong></span>Также вы можете задать вопросы в чате обратной связи на сайте.</div></div>",
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
