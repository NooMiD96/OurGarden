using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Web.Migrations
{
    /// <inheritdoc />
    public partial class InitDataBase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ApplicationUser",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    IsAdmin = table.Column<bool>(type: "INTEGER", nullable: false),
                    UserName = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "INTEGER", nullable: false),
                    PasswordHash = table.Column<string>(type: "TEXT", nullable: true),
                    SecurityStamp = table.Column<string>(type: "TEXT", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "TEXT", nullable: true),
                    PhoneNumber = table.Column<string>(type: "TEXT", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "INTEGER", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "INTEGER", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "TEXT", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "INTEGER", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplicationUser", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Category",
                columns: table => new
                {
                    CategoryId = table.Column<string>(type: "TEXT", maxLength: 64, nullable: false),
                    Alias = table.Column<string>(type: "TEXT", maxLength: 64, nullable: false),
                    IsVisible = table.Column<bool>(type: "INTEGER", nullable: false, defaultValue: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    SeoTitle = table.Column<string>(type: "TEXT", maxLength: 128, nullable: true),
                    SeoDescription = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    SeoKeywords = table.Column<string>(type: "TEXT", maxLength: 512, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Category", x => x.CategoryId);
                });

            migrationBuilder.CreateTable(
                name: "Clients",
                columns: table => new
                {
                    ClientId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Phone = table.Column<string>(type: "TEXT", maxLength: 32, nullable: false),
                    Email = table.Column<string>(type: "TEXT", maxLength: 64, nullable: true),
                    FIO = table.Column<string>(type: "TEXT", maxLength: 128, nullable: false),
                    IsIncludeInMailing = table.Column<bool>(type: "INTEGER", nullable: false, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clients", x => x.ClientId);
                });

            migrationBuilder.CreateTable(
                name: "Gallery",
                columns: table => new
                {
                    GalleryId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    NormalizeAlias = table.Column<string>(type: "TEXT", maxLength: 256, nullable: false),
                    Alias = table.Column<string>(type: "TEXT", maxLength: 128, nullable: false),
                    IsVisible = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Gallery", x => x.GalleryId);
                });

            migrationBuilder.CreateTable(
                name: "News",
                columns: table => new
                {
                    NewsId = table.Column<string>(type: "TEXT", maxLength: 128, nullable: false),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Alias = table.Column<string>(type: "TEXT", maxLength: 128, nullable: false),
                    SeoTitle = table.Column<string>(type: "TEXT", maxLength: 128, nullable: true),
                    SeoDescription = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    SeoKeywords = table.Column<string>(type: "TEXT", maxLength: 512, nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_News", x => x.NewsId);
                });

            migrationBuilder.CreateTable(
                name: "PageInfo",
                columns: table => new
                {
                    PageInfoId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    NormalizeAlias = table.Column<string>(type: "TEXT", maxLength: 256, nullable: false),
                    Alias = table.Column<string>(type: "TEXT", maxLength: 128, nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    SeoTitle = table.Column<string>(type: "TEXT", maxLength: 128, nullable: true),
                    SeoDescription = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    SeoKeywords = table.Column<string>(type: "TEXT", maxLength: 512, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PageInfo", x => x.PageInfoId);
                });

            migrationBuilder.CreateTable(
                name: "Status",
                columns: table => new
                {
                    StatusId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", maxLength: 128, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Status", x => x.StatusId);
                });

            migrationBuilder.CreateTable(
                name: "Video",
                columns: table => new
                {
                    VideoId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", maxLength: 128, nullable: false),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", maxLength: 512, nullable: false),
                    Url = table.Column<string>(type: "TEXT", maxLength: 256, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Video", x => x.VideoId);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<string>(type: "TEXT", nullable: false),
                    ClaimType = table.Column<string>(type: "TEXT", nullable: true),
                    ClaimValue = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_ApplicationUser_UserId",
                        column: x => x.UserId,
                        principalTable: "ApplicationUser",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "TEXT", nullable: false),
                    ProviderKey = table.Column<string>(type: "TEXT", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "TEXT", nullable: true),
                    UserId = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_ApplicationUser_UserId",
                        column: x => x.UserId,
                        principalTable: "ApplicationUser",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "TEXT", nullable: false),
                    LoginProvider = table.Column<string>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Value = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_ApplicationUser_UserId",
                        column: x => x.UserId,
                        principalTable: "ApplicationUser",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RoleId = table.Column<string>(type: "TEXT", nullable: false),
                    ClaimType = table.Column<string>(type: "TEXT", nullable: true),
                    ClaimValue = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "TEXT", nullable: false),
                    RoleId = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_ApplicationUser_UserId",
                        column: x => x.UserId,
                        principalTable: "ApplicationUser",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Subcategory",
                columns: table => new
                {
                    SubcategoryId = table.Column<string>(type: "TEXT", maxLength: 64, nullable: false),
                    CategoryId = table.Column<string>(type: "TEXT", maxLength: 64, nullable: false),
                    Alias = table.Column<string>(type: "TEXT", maxLength: 64, nullable: false),
                    IsVisible = table.Column<bool>(type: "INTEGER", nullable: false, defaultValue: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    SeoTitle = table.Column<string>(type: "TEXT", maxLength: 128, nullable: true),
                    SeoDescription = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    SeoKeywords = table.Column<string>(type: "TEXT", maxLength: 512, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subcategory", x => new { x.SubcategoryId, x.CategoryId });
                    table.ForeignKey(
                        name: "FK_Subcategory_Category_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Category",
                        principalColumn: "CategoryId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Order",
                columns: table => new
                {
                    OrderId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Phone = table.Column<string>(type: "TEXT", maxLength: 32, nullable: false),
                    Email = table.Column<string>(type: "TEXT", maxLength: 64, nullable: true),
                    FIO = table.Column<string>(type: "TEXT", maxLength: 128, nullable: false),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    TotalPrice = table.Column<double>(type: "REAL", nullable: false),
                    StatusId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Order", x => x.OrderId);
                    table.ForeignKey(
                        name: "FK_Order_Status_StatusId",
                        column: x => x.StatusId,
                        principalTable: "Status",
                        principalColumn: "StatusId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Product",
                columns: table => new
                {
                    ProductId = table.Column<string>(type: "TEXT", maxLength: 128, nullable: false),
                    SubcategoryId = table.Column<string>(type: "TEXT", maxLength: 64, nullable: false),
                    CategoryId = table.Column<string>(type: "TEXT", maxLength: 64, nullable: false),
                    Alias = table.Column<string>(type: "TEXT", maxLength: 128, nullable: false),
                    Price = table.Column<double>(type: "REAL", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    IsVisible = table.Column<bool>(type: "INTEGER", nullable: false, defaultValue: true),
                    SeoTitle = table.Column<string>(type: "TEXT", maxLength: 128, nullable: true),
                    SeoDescription = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    SeoKeywords = table.Column<string>(type: "TEXT", maxLength: 512, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Product", x => new { x.ProductId, x.SubcategoryId, x.CategoryId });
                    table.ForeignKey(
                        name: "FK_Product_Subcategory_SubcategoryId_CategoryId",
                        columns: x => new { x.SubcategoryId, x.CategoryId },
                        principalTable: "Subcategory",
                        principalColumns: new[] { "SubcategoryId", "CategoryId" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderPosition",
                columns: table => new
                {
                    OrderPositionId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Number = table.Column<int>(type: "INTEGER", nullable: false),
                    Price = table.Column<double>(type: "REAL", nullable: false),
                    Name = table.Column<string>(type: "TEXT", maxLength: 128, nullable: false),
                    ProductId = table.Column<string>(type: "TEXT", maxLength: 128, nullable: false),
                    SubcategoryId = table.Column<string>(type: "TEXT", maxLength: 64, nullable: false),
                    CategoryId = table.Column<string>(type: "TEXT", maxLength: 64, nullable: false),
                    OrderId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderPosition", x => x.OrderPositionId);
                    table.ForeignKey(
                        name: "FK_OrderPosition_Order_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Order",
                        principalColumn: "OrderId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderPosition_Product_ProductId_SubcategoryId_CategoryId",
                        columns: x => new { x.ProductId, x.SubcategoryId, x.CategoryId },
                        principalTable: "Product",
                        principalColumns: new[] { "ProductId", "SubcategoryId", "CategoryId" },
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Photo",
                columns: table => new
                {
                    PhotoId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", maxLength: 128, nullable: false),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Url = table.Column<string>(type: "TEXT", maxLength: 128, nullable: false),
                    PreviewUrl = table.Column<string>(type: "TEXT", maxLength: 128, nullable: true),
                    CategoryId = table.Column<string>(type: "TEXT", nullable: true),
                    GalleryId = table.Column<int>(type: "INTEGER", nullable: true),
                    NewsId = table.Column<string>(type: "TEXT", nullable: true),
                    PageInfoId = table.Column<int>(type: "INTEGER", nullable: true),
                    ProductCategoryId = table.Column<string>(type: "TEXT", nullable: true),
                    ProductId = table.Column<string>(type: "TEXT", nullable: true),
                    ProductSubcategoryId = table.Column<string>(type: "TEXT", nullable: true),
                    SubcategoryCategoryId = table.Column<string>(type: "TEXT", nullable: true),
                    SubcategoryId = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Photo", x => x.PhotoId);
                    table.ForeignKey(
                        name: "FK_Photo_Category_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Category",
                        principalColumn: "CategoryId");
                    table.ForeignKey(
                        name: "FK_Photo_Gallery_GalleryId",
                        column: x => x.GalleryId,
                        principalTable: "Gallery",
                        principalColumn: "GalleryId");
                    table.ForeignKey(
                        name: "FK_Photo_News_NewsId",
                        column: x => x.NewsId,
                        principalTable: "News",
                        principalColumn: "NewsId");
                    table.ForeignKey(
                        name: "FK_Photo_PageInfo_PageInfoId",
                        column: x => x.PageInfoId,
                        principalTable: "PageInfo",
                        principalColumn: "PageInfoId");
                    table.ForeignKey(
                        name: "FK_Photo_Product_ProductId_ProductSubcategoryId_ProductCategoryId",
                        columns: x => new { x.ProductId, x.ProductSubcategoryId, x.ProductCategoryId },
                        principalTable: "Product",
                        principalColumns: new[] { "ProductId", "SubcategoryId", "CategoryId" });
                    table.ForeignKey(
                        name: "FK_Photo_Subcategory_SubcategoryId_SubcategoryCategoryId",
                        columns: x => new { x.SubcategoryId, x.SubcategoryCategoryId },
                        principalTable: "Subcategory",
                        principalColumns: new[] { "SubcategoryId", "CategoryId" });
                });

            migrationBuilder.InsertData(
                table: "PageInfo",
                columns: new[] { "PageInfoId", "Alias", "Description", "NormalizeAlias", "SeoDescription", "SeoKeywords", "SeoTitle" },
                values: new object[,]
                {
                    { 1, "Главная", "<h1><strong>Семена и посадочный материал в Туле</strong></h1><p>Предлагаем широкий ассортимент продукции для сада и огорода. Здесь вы найдете саженцы плодовых и декоративных растений, гарантированно жизнеспособных и высокого качества. В компании «Наш Сад» в Туле можно купить семена и посадочный материал оптом и в розницу. Вырастить и увеличить урожай помогут специализированные грунты. Наша продукция подходит для украшения загородных участков, проведения ландшафтных работ, городского озеленения. Компания постоянно работает над расширением ассортимента сортов и видов растений.</p><h2><strong>Ландшафтный дизайн, омолаживающая обрезка и уход</strong></h2><p>Предлагаем услуги по ландшафтному дизайну и уходу за садом. Создаем сады любой сложности, адаптированные под российский климат и сохраняющие декоративность круглый год. Воплощаем самые смелые идеи. Берем на себя все работы: создание проекта, благоустройство участка, озеленение, а также последующий уход за растениями. Стрижем, обрезаем растения, ухаживаем за газоном, укрываем на зиму, боремся с вредителями. Омолодим и облагородим старый сад.</p><h3><strong>Где купить семена оптом</strong></h3><p>Если вы ищете, где купить посадочный материал, семена, заказать услуги по уходу за растениями, обращайтесь в компанию «Наш Сад». Наши сотрудники сделают все, чтобы ваш дачный или приусадебный участок круглый год радовал богатыми урожаями и неповторимым ландшафтом. Приглашаем к сотрудничеству оптовых покупателей.</p>", "Home", "Купить семена в садовом центре «Наш сад» в Туле оптом и в розницу. Посадочный материал, грунты высокого качества. Ландшафтный дизайн и уход за растениями. Омоложение старых садов.", "купить семена в Туле, оптом, где купить", "Купить семена, посадочный материал в Туле" },
                    { 2, "Ландшафтный дизайн", "<h1><strong>Ландшафтный дизайн</strong></h1><p><strong>Ландшафтный дизайн участка — </strong>это настоящее междисциплинарное искусство, сочетающее в себе проектирование, архитектурные решения и багаж знаний в области растениеводства. Ландшафтный дизайн применяется для облагораживания территории<strong> дачных участков, </strong>парков, скверов, пешеходных зон. Заказывать разработку проекта ландшафтного дизайна лучше всего на начальном этапе строительства<strong> загородного дома </strong>или создания парка.</p>{{gallery=Ландшафтный дизайн}}<p>Квалифицированный и опытный ландшафтный дизайнер никогда не работает один — созданием<strong> декоративного озеленения </strong>должна заниматься команда работников: биологи, дизайнеры и строители, иначе добиться оптимального соседства для растений невозможно.</p><h2><strong>Этапы организации гармоничного ландшафтного дизайна участка</strong></h2><p>Комплексная работа по<strong> благоустройству </strong>участка придаст ему гармоничный вид: растения будут красиво сочетаться и прекрасно уживаться друг с другом, а все системы — бесперебойно функционировать. Для этого специалисты прибегают к тщательному поэтапному изучению участка:</p><ul><li>Для подбора растений они собирают данные о типе почвы, освещенности и направления движения ветра.</li><li>Определяют расположение коммуникаций, чтобы избежать их повреждения.</li><li>Совместно с клиентом составляют проекта: утверждают функциональные зоны, дорожки, перечень растений, их местоположение на участке, список необходимые технических элементов.</li><li>Подготавливают почву для<strong> озеленения участка </strong>, прокладываю труб, монтажу дренажных систем и систем автоматического полива, а также устанавливают беседки, мангала, искусственный водоем, цветник и многое другое.</li></ul><p><strong>Заказать ландшафтный дизайн под ключ </strong>гораздо выгоднее, чем выбрать отдельные элементы.</p><h3><strong>Ландшафтный дизайн в Туле</strong></h3><p>Заказать<strong> ландшафтный дизайн в Туле </strong>можно у специалистов компании «Наш Сад». Мы разрабатываем проекты быстро и недорого, имеем многолетний опыт проведения работ по<strong> озеленению участков </strong>любой сложности. Мы предоставляем портфолио работ и заключаем договор, точно соблюдая все пункты и срок сдачи объекта.</p><p>Звоните по телефону {{phone}} и заказывайте<strong> ландшафтное озеленение территории в Туле. </strong>Также вы можете задать вопросы в чате обратной связи на сайте.</p>", "Design", "Ландшафтный дизайн участка от мастеров фирмы «Наш Сад»: мы занимаемся облагораживанием и озеленением дачных, приусадебных, садовых участков любой сложности. Работаем под ключ.", "ландшафтный, дизайн, Тула, участок, озеленение", "Ландшафтный дизайн участка и озеленение под ключ в Туле" },
                    { 3, "Доставка и оплата", "<h1><strong>Доставка</strong></h1><p>Уважаемые покупатели! Наш магазин предоставляет возможность доставки ваших заказов по Туле и области.</p><p>Доставка на следующий день после оформления заказа при условии наличия товара на складе магазина.</p><p>Стоимость доставки в пределах г. Тула:</p><ul><li>При общей стоимости заказа менее 5000 рублей – 290 рублей;</li><li>При общей стоимости заказа более 5000 рублей – бесплатно;</li></ul><p>Доставка за пределы административных границ г. Тула:</p><ul><li>При общей стоимости заказа менее 5000 рублей – 490 рублей;</li><li>При общей стоимости заказа более 5000 рублей – 490 рублей;</li></ul><h1><strong>Заказ</strong></h1><p>После оформления заказа на сайте, наш оператор Вам перезвонит для получения дополнительной информации.</p><p>Заказы, которые были оформлены в нерабочее время (вечером и ночью), обрабатываются утром следующего дня.</p><p>Сбор и доставка товаров «под заказ» требуют определённого времени. Чтобы получить дополнительную информацию о таких товарах, их цену и время доставки, Вы можете связаться с нашими операторами. Если какой-то из товаров не удалось найти на нашем сайте, Вы так же можете уточнить его наличие у наших операторов используя форму обратной связи или по телефону {{phone}}.</p><h1><strong>Оплата</strong></h1><ol><li>Оплата в магазине:<br>Вы можете оплатить свой заказа заранее, в нашем магазине по адресу:<br>{{address}}<br>&nbsp;</li><li>Оплата курьеру:<br>Вы можете оплатить заказ нашему курьеру после получения и подтверждения целостности заказа в том случае, если Вы не оплатили его заранее.</li></ol>", "Payment", null, null, "Доставка и оплата" },
                    { 4, "Рулонный газон", "<h1><strong>Рулонный газон</strong></h1><p><strong>Рулонный газон — </strong>это экологически чистое покрытие для земельного участка; пророщенная трава на дерновой подложке.<strong> Газон под ключ </strong>должен иметь равномерный насыщенный зеленый окрас, развитую корневую систему с белыми корешками и густой покров без сорняков.</p><p>Рулонный газон может украсить лужайку у частного дома, участок на даче, городской газон или парк отдыха — рулон достаточно раскатать и полить водой. На таком покрытии приятно играть в мяч, устраивать пикники, загорать и весело проводить время всей семьей, оно плотное, мягкое и безопасное.</p><p>Трава в рулоне помогает быстро украсить любой земельный участок. Она устойчива к жаре, холоду, длительному отсутствию влаги, а также к болезням. Качественный рулонный газон прослужит несколько лет и не доставит хлопот с уходом: нужно будет лишь своевременно подстригать газонокосилкой подросшую траву для придания аккуратного вида.</p><p>Продается<strong> газон под ключ </strong>в рулонах весом от 15 до 25 кг. Скрутка рулонов должна быть плотная, а края — ровные, толщина дерна — от 2 до 2,5 см, а скошенная трава на нем — не менее 3 см в высоту. Весь рулон должен быть равномерно обработан газонокосилкой, без проплешин, также он должен не осыпаться при скручивании и раскручивании. Длительное хранение в свернутом виде может привести к порче дерна и увяданию травы, поэтому покупать рулонный газон рекомендуется непосредственно перед<strong> укладкой.</strong></p><h2><strong>Купить рулонный газон в Туле</strong></h2><p><strong>Рулонный газон под ключ </strong>можно купить в Туле, сделав заказ в интернет-магазине компании «Наш Сад». На сайте указана цена за м2, а наши сотрудники помогут вам рассчитать необходимое количество рулонов для любой площади и формы земельного участка.</p><p>Для этого звоните по номеру {{phone}} или напишите в чат обратной связи на сайте.</p>", "rulonnyj-gazon", "Купить качественный и недорогой рулонный газон под ключ в Туле можно в интернет-магазине «Наш Сад»: мы предоставляем доставку на дом в любой уголок России.", "газон, ключ, рулонный", "Рулонный газон под ключ в Туле" },
                    { 5, "Каталог", null, "Catalog", "Купить товары для сада в Туле. У нас в наличии Грунты, Гортензии, Картофель, Колоновидные деревья, Лук, Малина, Мини-деревья, Английские и Японские розы и другие товары.", null, "Каталог" },
                    { 6, "Новости", null, "News", null, null, "Новости" },
                    { 7, "Контакты", null, "Contacts", null, null, "Контакты" },
                    { 8, "Корзина", null, "Card", null, null, "Корзина" },
                    { 9, "О нас", "<p>Данный раздел находится в разработке, приходите позднее!</p>", "About", null, null, "О нас" }
                });

            migrationBuilder.InsertData(
                table: "Status",
                columns: new[] { "StatusId", "Name" },
                values: new object[,]
                {
                    { -1, "Заказ отменён" },
                    { 1, "Новый заказ" },
                    { 2, "Заказ подтверждён" },
                    { 3, "Заказ отправлен" },
                    { 4, "Заказ ожидает получателя" },
                    { 5, "Заказ закрыт" }
                });

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "ApplicationUser",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "ApplicationUser",
                column: "NormalizedUserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_Order_StatusId",
                table: "Order",
                column: "StatusId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderPosition_OrderId",
                table: "OrderPosition",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderPosition_ProductId_SubcategoryId_CategoryId",
                table: "OrderPosition",
                columns: new[] { "ProductId", "SubcategoryId", "CategoryId" });

            migrationBuilder.CreateIndex(
                name: "IX_Photo_CategoryId",
                table: "Photo",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Photo_GalleryId",
                table: "Photo",
                column: "GalleryId");

            migrationBuilder.CreateIndex(
                name: "IX_Photo_NewsId",
                table: "Photo",
                column: "NewsId");

            migrationBuilder.CreateIndex(
                name: "IX_Photo_PageInfoId",
                table: "Photo",
                column: "PageInfoId");

            migrationBuilder.CreateIndex(
                name: "IX_Photo_ProductId_ProductSubcategoryId_ProductCategoryId",
                table: "Photo",
                columns: new[] { "ProductId", "ProductSubcategoryId", "ProductCategoryId" });

            migrationBuilder.CreateIndex(
                name: "IX_Photo_SubcategoryId_SubcategoryCategoryId",
                table: "Photo",
                columns: new[] { "SubcategoryId", "SubcategoryCategoryId" });

            migrationBuilder.CreateIndex(
                name: "IX_Product_SubcategoryId_CategoryId",
                table: "Product",
                columns: new[] { "SubcategoryId", "CategoryId" });

            migrationBuilder.CreateIndex(
                name: "IX_Subcategory_CategoryId",
                table: "Subcategory",
                column: "CategoryId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "Clients");

            migrationBuilder.DropTable(
                name: "OrderPosition");

            migrationBuilder.DropTable(
                name: "Photo");

            migrationBuilder.DropTable(
                name: "Video");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "ApplicationUser");

            migrationBuilder.DropTable(
                name: "Order");

            migrationBuilder.DropTable(
                name: "Gallery");

            migrationBuilder.DropTable(
                name: "News");

            migrationBuilder.DropTable(
                name: "PageInfo");

            migrationBuilder.DropTable(
                name: "Product");

            migrationBuilder.DropTable(
                name: "Status");

            migrationBuilder.DropTable(
                name: "Subcategory");

            migrationBuilder.DropTable(
                name: "Category");
        }
    }
}
