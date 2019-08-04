using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class fixProducts : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Descriprion",
                table: "Product",
                newName: "Description");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Product",
                newName: "Descriprion");
        }
    }
}
