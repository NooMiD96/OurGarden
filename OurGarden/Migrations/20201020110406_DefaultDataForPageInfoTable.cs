using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class DefaultDataForPageInfoTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "PageInfo",
                columns: new[] { "PageInfoId", "Alias", "Description", "NormalizeAlias", "SeoDescription", "SeoKeywords", "SeoTitle" },
                values: new object[,]
                {
                    { 5, "Каталог", null, "Catalog", "Купить товары для сада в Туле. У нас в наличии Грунты, Гортензии, Картофель, Колоновидные деревья, Лук, Малина, Мини-деревья, Английские и Японские розы и другие товары.", null, "Каталог" },
                    { 6, "Новости", null, "News", null, null, "Новости" },
                    { 7, "Контакты", null, "About", null, null, "Контакты" },
                    { 8, "Корзина", null, "Card", null, null, "Корзина" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "PageInfo",
                keyColumn: "PageInfoId",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "PageInfo",
                keyColumn: "PageInfoId",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "PageInfo",
                keyColumn: "PageInfoId",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "PageInfo",
                keyColumn: "PageInfoId",
                keyValue: 8);
        }
    }
}
