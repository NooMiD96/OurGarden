using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class AddUrlRemoveByteArr : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BinaryData",
                table: "Photo");

            migrationBuilder.AddColumn<string>(
                name: "Url",
                table: "Photo",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Url",
                table: "Photo");

            migrationBuilder.AddColumn<byte[]>(
                name: "BinaryData",
                table: "Photo",
                nullable: false,
                defaultValue: new byte[] {  });
        }
    }
}
