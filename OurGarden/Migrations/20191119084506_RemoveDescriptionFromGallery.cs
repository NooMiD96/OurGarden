using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class RemoveDescriptionFromGallery : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Gallery");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Gallery",
                maxLength: 256,
                nullable: false,
                defaultValue: "");
        }
    }
}
