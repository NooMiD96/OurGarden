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
                        NormalizeAlias = "Home",
                        Description = @"<h1><strong>Семена и посадочный материал в Туле</strong></h1><p>Предлагаем широкий ассортимент продукции для сада и огорода. Здесь вы найдете саженцы плодовых и декоративных растений, гарантированно жизнеспособных и высокого качества. В компании «Наш Сад» в Туле можно купить семена и посадочный материал оптом и в розницу. Вырастить и увеличить урожай помогут специализированные грунты. Наша продукция подходит для украшения загородных участков, проведения ландшафтных работ, городского озеленения. Компания постоянно работает над расширением ассортимента сортов и видов растений.</p><h2><strong>Ландшафтный дизайн, омолаживающая обрезка и уход</strong></h2><p>Предлагаем услуги по ландшафтному дизайну и уходу за садом. Создаем сады любой сложности, адаптированные под российский климат и сохраняющие декоративность круглый год. Воплощаем самые смелые идеи. Берем на себя все работы: создание проекта, благоустройство участка, озеленение, а также последующий уход за растениями. Стрижем, обрезаем растения, ухаживаем за газоном, укрываем на зиму, боремся с вредителями. Омолодим и облагородим старый сад.</p><h3><strong>Где купить семена оптом</strong></h3><p>Если вы ищете, где купить посадочный материал, семена, заказать услуги по уходу за растениями, обращайтесь в компанию «Наш Сад». Наши сотрудники сделают все, чтобы ваш дачный или приусадебный участок круглый год радовал богатыми урожаями и неповторимым ландшафтом. Приглашаем к сотрудничеству оптовых покупателей.</p>",
                        SeoTitle = "Купить семена, посадочный материал в Туле",
                        SeoDescription = "Купить семена в садовом центре «Наш сад» в Туле оптом и в розницу. Посадочный материал, грунты высокого качества. Ландшафтный дизайн и уход за растениями. Омоложение старых садов.",
                        SeoKeywords = "купить семена в Туле, оптом, где купить"
                    },
                    new PageInfo()
                    {
                        PageInfoId = Abstraction.Model.PageInfo.DesignPageId,
                        Alias = "Ландшафтный дизайн",
                        NormalizeAlias = "Design",
                        Description = @"<h1><strong>Ландшафтный дизайн</strong></h1><p><strong>Ландшафтный дизайн участка — </strong>это настоящее междисциплинарное искусство, сочетающее в себе проектирование, архитектурные решения и багаж знаний в области растениеводства. Ландшафтный дизайн применяется для облагораживания территории<strong> дачных участков, </strong>парков, скверов, пешеходных зон. Заказывать разработку проекта ландшафтного дизайна лучше всего на начальном этапе строительства<strong> загородного дома </strong>или создания парка.</p>{{gallery=Ландшафтный дизайн}}<p>Квалифицированный и опытный ландшафтный дизайнер никогда не работает один — созданием<strong> декоративного озеленения </strong>должна заниматься команда работников: биологи, дизайнеры и строители, иначе добиться оптимального соседства для растений невозможно.</p><h2><strong>Этапы организации гармоничного ландшафтного дизайна участка</strong></h2><p>Комплексная работа по<strong> благоустройству </strong>участка придаст ему гармоничный вид: растения будут красиво сочетаться и прекрасно уживаться друг с другом, а все системы — бесперебойно функционировать. Для этого специалисты прибегают к тщательному поэтапному изучению участка:</p><ul><li>Для подбора растений они собирают данные о типе почвы, освещенности и направления движения ветра.</li><li>Определяют расположение коммуникаций, чтобы избежать их повреждения.</li><li>Совместно с клиентом составляют проекта: утверждают функциональные зоны, дорожки, перечень растений, их местоположение на участке, список необходимые технических элементов.</li><li>Подготавливают почву для<strong> озеленения участка </strong>, прокладываю труб, монтажу дренажных систем и систем автоматического полива, а также устанавливают беседки, мангала, искусственный водоем, цветник и многое другое.</li></ul><p><strong>Заказать ландшафтный дизайн под ключ </strong>гораздо выгоднее, чем выбрать отдельные элементы.</p><h3><strong>Ландшафтный дизайн в Туле</strong></h3><p>Заказать<strong> ландшафтный дизайн в Туле </strong>можно у специалистов компании «Наш Сад». Мы разрабатываем проекты быстро и недорого, имеем многолетний опыт проведения работ по<strong> озеленению участков </strong>любой сложности. Мы предоставляем портфолио работ и заключаем договор, точно соблюдая все пункты и срок сдачи объекта.</p><p>Звоните по телефону {{phone}} и заказывайте<strong> ландшафтное озеленение территории в Туле. </strong>Также вы можете задать вопросы в чате обратной связи на сайте.</p>",
                        SeoTitle = "Ландшафтный дизайн участка и озеленение под ключ в Туле",
                        SeoDescription = "Ландшафтный дизайн участка от мастеров фирмы «Наш Сад»: мы занимаемся облагораживанием и озеленением дачных, приусадебных, садовых участков любой сложности. Работаем под ключ.",
                        SeoKeywords = "ландшафтный, дизайн, Тула, участок, озеленение"
                    },
                    new PageInfo()
                    {
                        PageInfoId = Abstraction.Model.PageInfo.PaymentPageId,
                        Alias = "Доставка и оплата",
                        NormalizeAlias = "Payment",
                        Description = @"<h1><strong>Доставка</strong></h1><p>Уважаемые покупатели! Наш магазин предоставляет возможность доставки ваших заказов по Туле и области.</p><p>Доставка на следующий день после оформления заказа при условии наличия товара на складе магазина.</p><p>Стоимость доставки в пределах г. Тула:</p><ul><li>При общей стоимости заказа менее 5000 рублей – 290 рублей;</li><li>При общей стоимости заказа более 5000 рублей – бесплатно;</li></ul><p>Доставка за пределы административных границ г. Тула:</p><ul><li>При общей стоимости заказа менее 5000 рублей – 490 рублей;</li><li>При общей стоимости заказа более 5000 рублей – 490 рублей;</li></ul><h1><strong>Заказ</strong></h1><p>После оформления заказа на сайте, наш оператор Вам перезвонит для получения дополнительной информации.</p><p>Заказы, которые были оформлены в нерабочее время (вечером и ночью), обрабатываются утром следующего дня.</p><p>Сбор и доставка товаров «под заказ» требуют определённого времени. Чтобы получить дополнительную информацию о таких товарах, их цену и время доставки, Вы можете связаться с нашими операторами. Если какой-то из товаров не удалось найти на нашем сайте, Вы так же можете уточнить его наличие у наших операторов используя форму обратной связи или по телефону {{phone}}.</p><h1><strong>Оплата</strong></h1><ol><li>Оплата в магазине:<br>Вы можете оплатить свой заказа заранее, в нашем магазине по адресу:<br>{{address}}<br>&nbsp;</li><li>Оплата курьеру:<br>Вы можете оплатить заказ нашему курьеру после получения и подтверждения целостности заказа в том случае, если Вы не оплатили его заранее.</li></ol>",
                        SeoTitle = "Доставка и оплата",
                        SeoDescription = null,
                        SeoKeywords = null
                    },
                    new PageInfo()
                    {
                        PageInfoId = Abstraction.Model.PageInfo.GazonPageId,
                        Alias = "Рулонный газон",
                        NormalizeAlias = "rulonnyj-gazon",
                        Description = @"<h1><strong>Рулонный газон</strong></h1><p><strong>Рулонный газон — </strong>это экологически чистое покрытие для земельного участка; пророщенная трава на дерновой подложке.<strong> Газон под ключ </strong>должен иметь равномерный насыщенный зеленый окрас, развитую корневую систему с белыми корешками и густой покров без сорняков.</p><p>Рулонный газон может украсить лужайку у частного дома, участок на даче, городской газон или парк отдыха — рулон достаточно раскатать и полить водой. На таком покрытии приятно играть в мяч, устраивать пикники, загорать и весело проводить время всей семьей, оно плотное, мягкое и безопасное.</p><p>Трава в рулоне помогает быстро украсить любой земельный участок. Она устойчива к жаре, холоду, длительному отсутствию влаги, а также к болезням. Качественный рулонный газон прослужит несколько лет и не доставит хлопот с уходом: нужно будет лишь своевременно подстригать газонокосилкой подросшую траву для придания аккуратного вида.</p><p>Продается<strong> газон под ключ </strong>в рулонах весом от 15 до 25 кг. Скрутка рулонов должна быть плотная, а края — ровные, толщина дерна — от 2 до 2,5 см, а скошенная трава на нем — не менее 3 см в высоту. Весь рулон должен быть равномерно обработан газонокосилкой, без проплешин, также он должен не осыпаться при скручивании и раскручивании. Длительное хранение в свернутом виде может привести к порче дерна и увяданию травы, поэтому покупать рулонный газон рекомендуется непосредственно перед<strong> укладкой.</strong></p><h2><strong>Купить рулонный газон в Туле</strong></h2><p><strong>Рулонный газон под ключ </strong>можно купить в Туле, сделав заказ в интернет-магазине компании «Наш Сад». На сайте указана цена за м2, а наши сотрудники помогут вам рассчитать необходимое количество рулонов для любой площади и формы земельного участка.</p><p>Для этого звоните по номеру {{phone}} или напишите в чат обратной связи на сайте.</p>",
                        SeoTitle = "Рулонный газон под ключ в Туле",
                        SeoDescription = "Купить качественный и недорогой рулонный газон под ключ в Туле можно в интернет-магазине «Наш Сад»: мы предоставляем доставку на дом в любой уголок России.",
                        SeoKeywords = "газон, ключ, рулонный"
                    },
                    new PageInfo()
                    {
                        PageInfoId = Abstraction.Model.PageInfo.CatalogPageId,
                        Alias = "Каталог",
                        NormalizeAlias = "Catalog",
                        Description = null,
                        SeoTitle = "Каталог",
                        SeoDescription = "Купить товары для сада в Туле. У нас в наличии Грунты, Гортензии, Картофель, Колоновидные деревья, Лук, Малина, Мини-деревья, Английские и Японские розы и другие товары.",
                        SeoKeywords = null
                    },
                    new PageInfo()
                    {
                        PageInfoId = Abstraction.Model.PageInfo.NewsListPageId,
                        Alias = "Новости",
                        NormalizeAlias = "News",
                        Description = null,
                        SeoTitle = "Новости",
                        SeoDescription = null,
                        SeoKeywords = null
                    },
                    new PageInfo()
                    {
                        PageInfoId = Abstraction.Model.PageInfo.ContactsPageId,
                        Alias = "Контакты",
                        NormalizeAlias = "About",
                        Description = null,
                        SeoTitle = "Контакты",
                        SeoDescription = null,
                        SeoKeywords = null
                    },
                    new PageInfo()
                    {
                        PageInfoId = Abstraction.Model.PageInfo.CardPageId,
                        Alias = "Корзина",
                        NormalizeAlias = "Card",
                        Description = null,
                        SeoTitle = "Корзина",
                        SeoDescription = null,
                        SeoKeywords = null
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
