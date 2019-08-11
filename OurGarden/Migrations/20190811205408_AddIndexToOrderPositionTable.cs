using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class AddIndexToOrderPositionTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_OrderPosition_ProductId_SubcategoryId_CategoryId",
                table: "OrderPosition");

            migrationBuilder.CreateIndex(
                name: "IX_OrderPosition_OrderId_ProductId_SubcategoryId_CategoryId",
                table: "OrderPosition",
                columns: new[] { "OrderId", "ProductId", "SubcategoryId", "CategoryId" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_OrderPosition_OrderId_ProductId_SubcategoryId_CategoryId",
                table: "OrderPosition");

            migrationBuilder.CreateIndex(
                name: "IX_OrderPosition_ProductId_SubcategoryId_CategoryId",
                table: "OrderPosition",
                columns: new[] { "ProductId", "SubcategoryId", "CategoryId" },
                unique: true);
        }
    }
}
