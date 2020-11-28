using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class AddAboutRemoveVideogalleryPage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "PageInfo",
                columns: new[] { "PageInfoId", "Alias", "Description", "NormalizeAlias", "SeoDescription", "SeoKeywords", "SeoTitle" },
                values: new object[] { 9, "О нас", "<p>Данный раздел находится в разработке, приходите позднее!</p>", "About", null, null, "О нас" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "PageInfo",
                keyColumn: "PageInfoId",
                keyValue: 9);
        }
    }
}
