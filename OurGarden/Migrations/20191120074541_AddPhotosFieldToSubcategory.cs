using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class AddPhotosFieldToSubcategory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Subcategory_Photo_PhotoId",
                table: "Subcategory");

            migrationBuilder.DropIndex(
                name: "IX_Subcategory_PhotoId",
                table: "Subcategory");

            migrationBuilder.DropColumn(
                name: "PhotoId",
                table: "Subcategory");

            migrationBuilder.AddColumn<string>(
                name: "SubcategoryCategoryId",
                table: "Photo",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SubcategoryId",
                table: "Photo",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Photo_SubcategoryId_SubcategoryCategoryId",
                table: "Photo",
                columns: new[] { "SubcategoryId", "SubcategoryCategoryId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Photo_Subcategory_SubcategoryId_SubcategoryCategoryId",
                table: "Photo",
                columns: new[] { "SubcategoryId", "SubcategoryCategoryId" },
                principalTable: "Subcategory",
                principalColumns: new[] { "SubcategoryId", "CategoryId" },
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photo_Subcategory_SubcategoryId_SubcategoryCategoryId",
                table: "Photo");

            migrationBuilder.DropIndex(
                name: "IX_Photo_SubcategoryId_SubcategoryCategoryId",
                table: "Photo");

            migrationBuilder.DropColumn(
                name: "SubcategoryCategoryId",
                table: "Photo");

            migrationBuilder.DropColumn(
                name: "SubcategoryId",
                table: "Photo");

            migrationBuilder.AddColumn<Guid>(
                name: "PhotoId",
                table: "Subcategory",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Subcategory_PhotoId",
                table: "Subcategory",
                column: "PhotoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Subcategory_Photo_PhotoId",
                table: "Subcategory",
                column: "PhotoId",
                principalTable: "Photo",
                principalColumn: "PhotoId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
