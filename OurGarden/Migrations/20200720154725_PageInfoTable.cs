using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class PageInfoTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PageInfoId",
                table: "Photo",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "PageInfo",
                columns: table => new
                {
                    PageInfoId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Alias = table.Column<string>(maxLength: 128, nullable: false),
                    Description = table.Column<string>(nullable: false),
                    SeoTitle = table.Column<string>(maxLength: 128, nullable: true),
                    SeoDescription = table.Column<string>(maxLength: 256, nullable: true),
                    SeoKeywords = table.Column<string>(maxLength: 512, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PageInfo", x => x.PageInfoId);
                });

            migrationBuilder.InsertData(
                table: "PageInfo",
                columns: new[] { "PageInfoId", "Alias", "Description", "SeoDescription", "SeoKeywords", "SeoTitle" },
                values: new object[] { 1, "Главная", "<article class=\"ant-typography content ourgarden-design grey-border white-background\"><div class=\"ant-typography\"><h1 class=\"ant-typography\">Cемена и посадочный материал в Туле</h1>Предлагаем широкий ассортимент продукции для сада и огорода. Здесь вы найдете саженцы плодовых и декоративных растений, гарантированно жизнеспособных и высокого качества. В компании «Наш Сад» в Туле можно купить семена и посадочный материал оптом и в розницу. Вырастить и увеличить урожай помогут специализированные грунты. Наша продукция подходит для украшения загородных участков, проведения ландшафтных работ, городского озеленения. Компания постоянно работает над расширением ассортимента сортов и видов растений.</div><div class=\"ant-typography\"><h2 class=\"ant-typography\">Ландшафтный дизайн, омолаживающая обрезка и уход</h2>Предлагаем услуги по ландшафтному дизайну и уходу за садом. Создаем сады любой сложности, адаптированные под российский климат и сохраняющие декоративность круглый год. Воплощаем самые смелые идеи. Берем на себя все работы: создание проекта, благоустройство участка, озеленение, а также последующий уход за растениями. Стрижем, обрезаем растения, ухаживаем за газоном, укрываем на зиму, боремся с вредителями. Омолодим и облагородим старый сад.</div><div class=\"ant-typography\"><h2 class=\"ant-typography\">Где купить семена оптом</h2>Если вы ищете, где купить посадочный материал, семена, заказать услуги по уходу за растениями, обращайтесь в компанию «Наш Сад». Наши сотрудники сделают все, чтобы ваш дачный или приусадебный участок круглый год радовал богатыми урожаями и неповторимым ландшафтом. Приглашаем к сотрудничеству оптовых покупателей.</div></article>", "Купить семена в садовом центре «Наш сад» в Туле оптом и в розницу. Посадочный материал, грунты высокого качества. Ландшафтный дизайн и уход за растениями. Омоложение старых садов.", "купить семена в туле, оптом, где купить", "Купить семена, посадочный материал в Туле" });

            migrationBuilder.InsertData(
                table: "PageInfo",
                columns: new[] { "PageInfoId", "Alias", "Description", "SeoDescription", "SeoKeywords", "SeoTitle" },
                values: new object[] { 2, "Ландшафтный дизайн", "<div><h1 class=\"ant-typography\">Ландшафтный дизайн</h1><div class=\"ant-typography\"><span class=\"ant-typography\"><strong>Ландшафтный дизайн участка — </strong></span>это настоящее междисциплинарное искусство, сочетающее в себе проектирование, архитектурные решения и багаж знаний в области растениеводства. Ландшафтный дизайн применяется для облагораживания территории<span class=\"ant-typography\"><strong> дачных участков, </strong></span>парков, скверов, пешеходных зон. Заказывать разработку проекта ландшафтного дизайна лучше всего на начальном этапе строительства<span class=\"ant-typography\"><strong> загородного дома </strong></span>или создания парка.</div><div class=\"ant-typography\">Квалифицированный и опытный ландшафтный дизайнер никогда не работает один — созданием<span class=\"ant-typography\"><strong> декоративного озеленения </strong></span>должна заниматься команда работников: биологи, дизайнеры и строители, иначе добиться оптимального соседства для растений невозможно.</div><h2 class=\"ant-typography\">Этапы организации гармоничного ландшафтного дизайна участка</h2><div class=\"ant-typography\">Комплексная работа по<span class=\"ant-typography\"><strong> благоустройству </strong></span>участка придаст ему гармоничный вид: растения будут красиво сочетаться и прекрасно уживаться друг с другом, а все системы — бесперебойно функционировать. Для этого специалисты прибегают к тщательному поэтапному изучению участка:</div><div class=\"ant-typography\"><ul><li>Для подбора растений они собирают данные о типе почвы, освещенности и направления движения ветра.</li><li>Определяют расположение коммуникаций, чтобы избежать их повреждения.</li><li>Совместно с клиентом составляют проекта: утверждают функциональные зоны, дорожки, перечень растений, их местоположение на участке, список необходимые технических элементов.</li><li>Подготавливают почву для<span class=\"ant-typography\"><strong> озеленения участка </strong></span>, прокладываю труб, монтажу дренажных систем и систем автоматического полива, а также устанавливают беседки, мангала, искусственный водоем, цветник и многое другое.</li></ul></div><div class=\"ant-typography\"><span class=\"ant-typography\"><strong>Заказать ландшафтный дизайн под ключ </strong></span>гораздо выгоднее, чем выбрать отдельные элементы.</div><h3 class=\"ant-typography\">Ландшафтный дизайн в Туле</h3><div class=\"ant-typography\">Заказать<span class=\"ant-typography\"><strong> ландшафтный дизайн в Туле </strong></span>можно у специалистов компании «Наш Сад». Мы разрабатываем проекты быстро и недорого, имеем многолетний опыт проведения работ по<span class=\"ant-typography\"><strong> озеленению участков </strong></span>любой сложности. Мы предоставляем портфолио работ и заключаем договор, точно соблюдая все пункты и срок сдачи объекта.</div><div class=\"ant-typography\">Звоните по телефону<!-- --> <a class=\"number-wrapper \" href=\"tel:+79534343516\"><span class=\"text\">+7 (953) 43-43-516</span></a> <!-- -->и заказывайте<span class=\"ant-typography\"><strong> ландшафтное озеленение территории в Туле. </strong></span>Также вы можете задать вопросы в чате обратной связи на сайте.</div></div>", "Ландшафтный дизайн участка от мастеров фирмы «Наш Сад»: мы занимаемся облагораживанием и озеленением дачных, приусадебных, садовых участков любой сложности. Работаем под ключ.", "ландшафтный, дизайн, тула, участок, озеленение", "Ландшафтный дизайн участка и озеленение под ключ в Туле" });

            migrationBuilder.CreateIndex(
                name: "IX_Photo_PageInfoId",
                table: "Photo",
                column: "PageInfoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Photo_PageInfo_PageInfoId",
                table: "Photo",
                column: "PageInfoId",
                principalTable: "PageInfo",
                principalColumn: "PageInfoId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photo_PageInfo_PageInfoId",
                table: "Photo");

            migrationBuilder.DropTable(
                name: "PageInfo");

            migrationBuilder.DropIndex(
                name: "IX_Photo_PageInfoId",
                table: "Photo");

            migrationBuilder.DropColumn(
                name: "PageInfoId",
                table: "Photo");
        }
    }
}
