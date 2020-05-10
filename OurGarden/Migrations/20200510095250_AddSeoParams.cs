using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class AddSeoParams : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SeoDescription",
                table: "Subcategory",
                maxLength: 150,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SeoKeywords",
                table: "Subcategory",
                maxLength: 512,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SeoTitle",
                table: "Subcategory",
                maxLength: 70,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SeoDescription",
                table: "Product",
                maxLength: 150,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SeoKeywords",
                table: "Product",
                maxLength: 512,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SeoTitle",
                table: "Product",
                maxLength: 70,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SeoDescription",
                table: "News",
                maxLength: 150,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SeoKeywords",
                table: "News",
                maxLength: 512,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SeoTitle",
                table: "News",
                maxLength: 70,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SeoDescription",
                table: "Category",
                maxLength: 150,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SeoKeywords",
                table: "Category",
                maxLength: 512,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SeoTitle",
                table: "Category",
                maxLength: 70,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SeoDescription",
                table: "Subcategory");

            migrationBuilder.DropColumn(
                name: "SeoKeywords",
                table: "Subcategory");

            migrationBuilder.DropColumn(
                name: "SeoTitle",
                table: "Subcategory");

            migrationBuilder.DropColumn(
                name: "SeoDescription",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "SeoKeywords",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "SeoTitle",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "SeoDescription",
                table: "News");

            migrationBuilder.DropColumn(
                name: "SeoKeywords",
                table: "News");

            migrationBuilder.DropColumn(
                name: "SeoTitle",
                table: "News");

            migrationBuilder.DropColumn(
                name: "SeoDescription",
                table: "Category");

            migrationBuilder.DropColumn(
                name: "SeoKeywords",
                table: "Category");

            migrationBuilder.DropColumn(
                name: "SeoTitle",
                table: "Category");
        }
    }
}
