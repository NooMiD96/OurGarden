using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class removeUrl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Url",
                table: "Photo");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Url",
                table: "Photo",
                maxLength: 256,
                nullable: false,
                defaultValue: "");
        }
    }
}
