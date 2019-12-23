using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class AddPhotoListInNewsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_News_Photo_PhotoId",
                table: "News");

            migrationBuilder.DropIndex(
                name: "IX_News_PhotoId",
                table: "News");

            migrationBuilder.DropColumn(
                name: "PhotoId",
                table: "News");

            migrationBuilder.AddColumn<int>(
                name: "NewsId",
                table: "Photo",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Photo_NewsId",
                table: "Photo",
                column: "NewsId");

            migrationBuilder.AddForeignKey(
                name: "FK_Photo_News_NewsId",
                table: "Photo",
                column: "NewsId",
                principalTable: "News",
                principalColumn: "NewsId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photo_News_NewsId",
                table: "Photo");

            migrationBuilder.DropIndex(
                name: "IX_Photo_NewsId",
                table: "Photo");

            migrationBuilder.DropColumn(
                name: "NewsId",
                table: "Photo");

            migrationBuilder.AddColumn<Guid>(
                name: "PhotoId",
                table: "News",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_News_PhotoId",
                table: "News",
                column: "PhotoId");

            migrationBuilder.AddForeignKey(
                name: "FK_News_Photo_PhotoId",
                table: "News",
                column: "PhotoId",
                principalTable: "Photo",
                principalColumn: "PhotoId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
