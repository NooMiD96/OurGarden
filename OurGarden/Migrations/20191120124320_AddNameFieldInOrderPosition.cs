using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class AddNameFieldInOrderPosition : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Url",
                table: "Photo",
                maxLength: 128,
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "PreviewUrl",
                table: "Photo",
                maxLength: 128,
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "OrderPosition",
                maxLength: 128,
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "OrderPosition");

            migrationBuilder.AlterColumn<string>(
                name: "Url",
                table: "Photo",
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 128);

            migrationBuilder.AlterColumn<string>(
                name: "PreviewUrl",
                table: "Photo",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 128,
                oldNullable: true);
        }
    }
}
