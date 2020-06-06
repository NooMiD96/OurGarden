using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class ChangeNewsStructure : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Title",
                table: "News");

            migrationBuilder.AlterColumn<string>(
                name: "NewsId",
                table: "Photo",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "NewsId",
                table: "News",
                maxLength: 128,
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("SqlServer:Identity", "1, 1");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "NewsId",
                table: "Photo",
                type: "int",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "NewsId",
                table: "News",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 128)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "News",
                type: "nvarchar(128)",
                maxLength: 128,
                nullable: false,
                defaultValue: "");
        }
    }
}
