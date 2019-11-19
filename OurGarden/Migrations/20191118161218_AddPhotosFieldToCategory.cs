using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class AddPhotosFieldToCategory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Category_Photo_PhotoId",
                table: "Category");

            migrationBuilder.DropIndex(
                name: "IX_Category_PhotoId",
                table: "Category");

            migrationBuilder.DropColumn(
                name: "PhotoId",
                table: "Category");

            migrationBuilder.AddColumn<string>(
                name: "CategoryId",
                table: "Photo",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Photo_CategoryId",
                table: "Photo",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Photo_Category_CategoryId",
                table: "Photo",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "CategoryId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photo_Category_CategoryId",
                table: "Photo");

            migrationBuilder.DropIndex(
                name: "IX_Photo_CategoryId",
                table: "Photo");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Photo");

            migrationBuilder.AddColumn<Guid>(
                name: "PhotoId",
                table: "Category",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Category_PhotoId",
                table: "Category",
                column: "PhotoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Category_Photo_PhotoId",
                table: "Category",
                column: "PhotoId",
                principalTable: "Photo",
                principalColumn: "PhotoId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
