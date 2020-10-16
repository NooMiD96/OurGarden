using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class NormilizeAliasForPageInfoTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "NormalizeAlias",
                table: "PageInfo",
                maxLength: 256,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NormalizeAlias",
                table: "PageInfo");
        }
    }
}
