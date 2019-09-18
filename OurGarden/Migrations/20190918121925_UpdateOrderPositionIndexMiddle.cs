using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class UpdateOrderPositionIndexMiddle : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_OrderPosition_ProductId_SubcategoryId_CategoryId",
                table: "OrderPosition");

            migrationBuilder.CreateIndex(
                name: "IX_OrderPosition_ProductId_SubcategoryId_CategoryId",
                table: "OrderPosition",
                columns: new[] { "ProductId", "SubcategoryId", "CategoryId" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_OrderPosition_ProductId_SubcategoryId_CategoryId",
                table: "OrderPosition");

            migrationBuilder.CreateIndex(
                name: "IX_OrderPosition_ProductId_SubcategoryId_CategoryId",
                table: "OrderPosition",
                columns: new[] { "ProductId", "SubcategoryId", "CategoryId" },
                unique: true);
        }
    }
}
