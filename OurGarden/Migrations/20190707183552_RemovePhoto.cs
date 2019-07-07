using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class RemovePhoto : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_News_Photo_PhotoId",
                table: "News");

            migrationBuilder.DropTable(
                name: "Photo");

            migrationBuilder.DropIndex(
                name: "IX_News_PhotoId",
                table: "News");

            migrationBuilder.DropColumn(
                name: "PhotoId",
                table: "News");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PhotoId",
                table: "News",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Photo",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Date = table.Column<DateTime>(nullable: false),
                    GaleryId = table.Column<int>(nullable: false),
                    Name = table.Column<string>(maxLength: 128, nullable: false),
                    ProductId = table.Column<int>(nullable: false),
                    ProductSubcategoryId = table.Column<int>(nullable: true),
                    ProductTitle = table.Column<string>(nullable: true),
                    Url = table.Column<string>(maxLength: 256, nullable: false)
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
                name: "IX_News_PhotoId",
                table: "News",
                column: "PhotoId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Photo_GaleryId",
                table: "Photo",
                column: "GaleryId");

            migrationBuilder.CreateIndex(
                name: "IX_Photo_ProductTitle_ProductSubcategoryId",
                table: "Photo",
                columns: new[] { "ProductTitle", "ProductSubcategoryId" });

            migrationBuilder.AddForeignKey(
                name: "FK_News_Photo_PhotoId",
                table: "News",
                column: "PhotoId",
                principalTable: "Photo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
