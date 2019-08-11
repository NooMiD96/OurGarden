using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class UpdateOrderPositionFK : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderPosition_Order_OrderId",
                table: "OrderPosition");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderPosition_Product_ProductId_SubcategoryId_CategoryId",
                table: "OrderPosition");

            migrationBuilder.DropIndex(
                name: "IX_OrderPosition_ProductId_SubcategoryId_CategoryId",
                table: "OrderPosition");

            migrationBuilder.AlterColumn<int>(
                name: "OrderId",
                table: "OrderPosition",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrderPosition_ProductId_SubcategoryId_CategoryId",
                table: "OrderPosition",
                columns: new[] { "ProductId", "SubcategoryId", "CategoryId" },
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderPosition_Order_OrderId",
                table: "OrderPosition",
                column: "OrderId",
                principalTable: "Order",
                principalColumn: "OrderId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderPosition_Product_ProductId_SubcategoryId_CategoryId",
                table: "OrderPosition",
                columns: new[] { "ProductId", "SubcategoryId", "CategoryId" },
                principalTable: "Product",
                principalColumns: new[] { "ProductId", "SubcategoryId", "CategoryId" },
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderPosition_Order_OrderId",
                table: "OrderPosition");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderPosition_Product_ProductId_SubcategoryId_CategoryId",
                table: "OrderPosition");

            migrationBuilder.DropIndex(
                name: "IX_OrderPosition_ProductId_SubcategoryId_CategoryId",
                table: "OrderPosition");

            migrationBuilder.AlterColumn<int>(
                name: "OrderId",
                table: "OrderPosition",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.CreateIndex(
                name: "IX_OrderPosition_ProductId_SubcategoryId_CategoryId",
                table: "OrderPosition",
                columns: new[] { "ProductId", "SubcategoryId", "CategoryId" });

            migrationBuilder.AddForeignKey(
                name: "FK_OrderPosition_Order_OrderId",
                table: "OrderPosition",
                column: "OrderId",
                principalTable: "Order",
                principalColumn: "OrderId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderPosition_Product_ProductId_SubcategoryId_CategoryId",
                table: "OrderPosition",
                columns: new[] { "ProductId", "SubcategoryId", "CategoryId" },
                principalTable: "Product",
                principalColumns: new[] { "ProductId", "SubcategoryId", "CategoryId" },
                onDelete: ReferentialAction.Cascade);
        }
    }
}
