using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class AddPreviewPhotoColumn_UpdateOrderPositionIndex_AddClientTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_OrderPosition_ProductId_SubcategoryId_CategoryId",
                table: "OrderPosition");

            migrationBuilder.AddColumn<string>(
                name: "PreviewUrl",
                table: "Photo",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Clients",
                columns: table => new
                {
                    ClientId = table.Column<int>(nullable: false),
                    Phone = table.Column<string>(maxLength: 16, nullable: false),
                    Email = table.Column<string>(maxLength: 64, nullable: true),
                    FIO = table.Column<string>(maxLength: 128, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clients", x => x.ClientId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderPosition_ProductId_SubcategoryId_CategoryId",
                table: "OrderPosition",
                columns: new[] { "ProductId", "SubcategoryId", "CategoryId" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Clients");

            migrationBuilder.DropIndex(
                name: "IX_OrderPosition_ProductId_SubcategoryId_CategoryId",
                table: "OrderPosition");

            migrationBuilder.DropColumn(
                name: "PreviewUrl",
                table: "Photo");

            migrationBuilder.CreateIndex(
                name: "IX_OrderPosition_ProductId_SubcategoryId_CategoryId",
                table: "OrderPosition",
                columns: new[] { "ProductId", "SubcategoryId", "CategoryId" },
                unique: true);
        }
    }
}
