using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class GalleryChangeNameOfNormalizedField : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Gallery");

            migrationBuilder.AddColumn<string>(
                name: "NormalizeAlias",
                table: "Gallery",
                maxLength: 256,
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NormalizeAlias",
                table: "Gallery");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Gallery",
                type: "nvarchar(128)",
                maxLength: 128,
                nullable: false,
                defaultValue: "");
        }
    }
}
