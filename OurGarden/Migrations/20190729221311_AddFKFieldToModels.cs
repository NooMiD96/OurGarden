using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class AddFKFieldToModels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Order_Status_StatusId",
                table: "Order");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderPosition_Product_ProductId_ProductSubcategoryId_ProductCategoryId",
                table: "OrderPosition");

            migrationBuilder.DropIndex(
                name: "IX_OrderPosition_ProductId_ProductSubcategoryId_ProductCategoryId",
                table: "OrderPosition");

            migrationBuilder.DropColumn(
                name: "ProductCategoryId",
                table: "OrderPosition");

            migrationBuilder.DropColumn(
                name: "ProductSubcategoryId",
                table: "OrderPosition");

            migrationBuilder.AlterColumn<string>(
                name: "ProductId",
                table: "OrderPosition",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CategoryId",
                table: "OrderPosition",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "SubcategoryId",
                table: "OrderPosition",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<int>(
                name: "StatusId",
                table: "Order",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "Status",
                columns: new[] { "StatusId", "Name" },
                values: new object[,]
                {
                    { 1, "Новый заказ" },
                    { 2, "Заказ подтверждён" },
                    { 3, "Заказ отправлен" },
                    { 4, "Заказ ожидает получателя" },
                    { 5, "Заказ закрыт" },
                    { -1, "Заказ отменён" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderPosition_ProductId_SubcategoryId_CategoryId",
                table: "OrderPosition",
                columns: new[] { "ProductId", "SubcategoryId", "CategoryId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Status_StatusId",
                table: "Order",
                column: "StatusId",
                principalTable: "Status",
                principalColumn: "StatusId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderPosition_Product_ProductId_SubcategoryId_CategoryId",
                table: "OrderPosition",
                columns: new[] { "ProductId", "SubcategoryId", "CategoryId" },
                principalTable: "Product",
                principalColumns: new[] { "ProductId", "SubcategoryId", "CategoryId" },
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Order_Status_StatusId",
                table: "Order");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderPosition_Product_ProductId_SubcategoryId_CategoryId",
                table: "OrderPosition");

            migrationBuilder.DropIndex(
                name: "IX_OrderPosition_ProductId_SubcategoryId_CategoryId",
                table: "OrderPosition");

            migrationBuilder.DeleteData(
                table: "Status",
                keyColumn: "StatusId",
                keyValue: -1);

            migrationBuilder.DeleteData(
                table: "Status",
                keyColumn: "StatusId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Status",
                keyColumn: "StatusId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Status",
                keyColumn: "StatusId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Status",
                keyColumn: "StatusId",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Status",
                keyColumn: "StatusId",
                keyValue: 5);

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "OrderPosition");

            migrationBuilder.DropColumn(
                name: "SubcategoryId",
                table: "OrderPosition");

            migrationBuilder.AlterColumn<string>(
                name: "ProductId",
                table: "OrderPosition",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AddColumn<string>(
                name: "ProductCategoryId",
                table: "OrderPosition",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProductSubcategoryId",
                table: "OrderPosition",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "StatusId",
                table: "Order",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.CreateIndex(
                name: "IX_OrderPosition_ProductId_ProductSubcategoryId_ProductCategoryId",
                table: "OrderPosition",
                columns: new[] { "ProductId", "ProductSubcategoryId", "ProductCategoryId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Status_StatusId",
                table: "Order",
                column: "StatusId",
                principalTable: "Status",
                principalColumn: "StatusId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderPosition_Product_ProductId_ProductSubcategoryId_ProductCategoryId",
                table: "OrderPosition",
                columns: new[] { "ProductId", "ProductSubcategoryId", "ProductCategoryId" },
                principalTable: "Product",
                principalColumns: new[] { "ProductId", "SubcategoryId", "CategoryId" },
                onDelete: ReferentialAction.Restrict);
        }
    }
}
