using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class ContactsPageIdChange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "PageInfo",
                keyColumn: "PageInfoId",
                keyValue: 7,
                column: "NormalizeAlias",
                value: "Contacts");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "PageInfo",
                keyColumn: "PageInfoId",
                keyValue: 7,
                column: "NormalizeAlias",
                value: "About");
        }
    }
}
