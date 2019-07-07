using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class AddPhoto : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "PhotoId",
                table: "Subcategory",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "PhotoId",
                table: "News",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "PhotoId",
                table: "Category",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "Photo",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(maxLength: 128, nullable: false),
                    Date = table.Column<DateTime>(nullable: false),
                    Url = table.Column<string>(maxLength: 256, nullable: false),
                    GaleryId = table.Column<int>(nullable: false),
                    ProductId = table.Column<int>(nullable: false),
                    ProductTitle = table.Column<string>(nullable: true),
                    ProductSubcategoryId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Photo", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Photo_Galery_GaleryId",
                        column: x => x.GaleryId,
                        principalTable: "Galery",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Photo_Product_ProductTitle_ProductSubcategoryId",
                        columns: x => new { x.ProductTitle, x.ProductSubcategoryId },
                        principalTable: "Product",
                        principalColumns: new[] { "Title", "SubcategoryId" },
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Subcategory_PhotoId",
                table: "Subcategory",
                column: "PhotoId");

            migrationBuilder.CreateIndex(
                name: "IX_News_PhotoId",
                table: "News",
                column: "PhotoId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Category_PhotoId",
                table: "Category",
                column: "PhotoId");

            migrationBuilder.CreateIndex(
                name: "IX_Photo_GaleryId",
                table: "Photo",
                column: "GaleryId");

            migrationBuilder.CreateIndex(
                name: "IX_Photo_ProductTitle_ProductSubcategoryId",
                table: "Photo",
                columns: new[] { "ProductTitle", "ProductSubcategoryId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Category_Photo_PhotoId",
                table: "Category",
                column: "PhotoId",
                principalTable: "Photo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_News_Photo_PhotoId",
                table: "News",
                column: "PhotoId",
                principalTable: "Photo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Subcategory_Photo_PhotoId",
                table: "Subcategory",
                column: "PhotoId",
                principalTable: "Photo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Category_Photo_PhotoId",
                table: "Category");

            migrationBuilder.DropForeignKey(
                name: "FK_News_Photo_PhotoId",
                table: "News");

            migrationBuilder.DropForeignKey(
                name: "FK_Subcategory_Photo_PhotoId",
                table: "Subcategory");

            migrationBuilder.DropTable(
                name: "Photo");

            migrationBuilder.DropIndex(
                name: "IX_Subcategory_PhotoId",
                table: "Subcategory");

            migrationBuilder.DropIndex(
                name: "IX_News_PhotoId",
                table: "News");

            migrationBuilder.DropIndex(
                name: "IX_Category_PhotoId",
                table: "Category");

            migrationBuilder.DropColumn(
                name: "PhotoId",
                table: "Subcategory");

            migrationBuilder.DropColumn(
                name: "PhotoId",
                table: "News");

            migrationBuilder.DropColumn(
                name: "PhotoId",
                table: "Category");
        }
    }
}
