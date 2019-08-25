using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class AddProductPriceToOrderPositionModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_OrderPosition_OrderId_ProductId_SubcategoryId_CategoryId",
                table: "OrderPosition");

            migrationBuilder.AddColumn<double>(
                name: "Price",
                table: "OrderPosition",
                nullable: false,
                defaultValue: 0.0);

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

            migrationBuilder.DropColumn(
                name: "Price",
                table: "OrderPosition");

            migrationBuilder.CreateIndex(
                name: "IX_OrderPosition_OrderId_ProductId_SubcategoryId_CategoryId",
                table: "OrderPosition",
                columns: new[] { "OrderId", "ProductId", "SubcategoryId", "CategoryId" },
                unique: true);
        }
    }
}
