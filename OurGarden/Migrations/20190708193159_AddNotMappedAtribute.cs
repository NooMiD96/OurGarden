using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class AddNotMappedAtribute : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Category_Photo_PhotoId",
                table: "Category");

            migrationBuilder.DropForeignKey(
                name: "FK_News_Photo_PhotoId",
                table: "News");

            migrationBuilder.DropForeignKey(
                name: "FK_Order_Status_StatusId",
                table: "Order");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderPosition_Product_ProductTitle_ProductSubcategoryId",
                table: "OrderPosition");

            migrationBuilder.DropForeignKey(
                name: "FK_Photo_Galery_GaleryId",
                table: "Photo");

            migrationBuilder.DropForeignKey(
                name: "FK_Photo_Product_ProductTitle_ProductSubcategoryId",
                table: "Photo");

            migrationBuilder.DropForeignKey(
                name: "FK_Product_Subcategory_SubcategoryId",
                table: "Product");

            migrationBuilder.DropForeignKey(
                name: "FK_Subcategory_Category_CategoryId",
                table: "Subcategory");

            migrationBuilder.DropIndex(
                name: "IX_Subcategory_CategoryId",
                table: "Subcategory");

            migrationBuilder.DropIndex(
                name: "IX_Product_SubcategoryId",
                table: "Product");

            migrationBuilder.DropIndex(
                name: "IX_Photo_GaleryId",
                table: "Photo");

            migrationBuilder.DropIndex(
                name: "IX_Photo_ProductTitle_ProductSubcategoryId",
                table: "Photo");

            migrationBuilder.DropIndex(
                name: "IX_OrderPosition_ProductTitle_ProductSubcategoryId",
                table: "OrderPosition");

            migrationBuilder.DropIndex(
                name: "IX_Order_StatusId",
                table: "Order");

            migrationBuilder.DropIndex(
                name: "IX_News_PhotoId",
                table: "News");

            migrationBuilder.DropIndex(
                name: "IX_Category_PhotoId",
                table: "Category");

            migrationBuilder.DropColumn(
                name: "ProductSubcategoryId",
                table: "Photo");

            migrationBuilder.DropColumn(
                name: "ProductTitle",
                table: "Photo");

            migrationBuilder.DropColumn(
                name: "ProductSubcategoryId",
                table: "OrderPosition");

            migrationBuilder.DropColumn(
                name: "ProductTitle",
                table: "OrderPosition");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProductSubcategoryId",
                table: "Photo",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProductTitle",
                table: "Photo",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProductSubcategoryId",
                table: "OrderPosition",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProductTitle",
                table: "OrderPosition",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Subcategory_CategoryId",
                table: "Subcategory",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Product_SubcategoryId",
                table: "Product",
                column: "SubcategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Photo_GaleryId",
                table: "Photo",
                column: "GaleryId");

            migrationBuilder.CreateIndex(
                name: "IX_Photo_ProductTitle_ProductSubcategoryId",
                table: "Photo",
                columns: new[] { "ProductTitle", "ProductSubcategoryId" });

            migrationBuilder.CreateIndex(
                name: "IX_OrderPosition_ProductTitle_ProductSubcategoryId",
                table: "OrderPosition",
                columns: new[] { "ProductTitle", "ProductSubcategoryId" });

            migrationBuilder.CreateIndex(
                name: "IX_Order_StatusId",
                table: "Order",
                column: "StatusId");

            migrationBuilder.CreateIndex(
                name: "IX_News_PhotoId",
                table: "News",
                column: "PhotoId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Category_PhotoId",
                table: "Category",
                column: "PhotoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Category_Photo_PhotoId",
                table: "Category",
                column: "PhotoId",
                principalTable: "Photo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_News_Photo_PhotoId",
                table: "News",
                column: "PhotoId",
                principalTable: "Photo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Status_StatusId",
                table: "Order",
                column: "StatusId",
                principalTable: "Status",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderPosition_Product_ProductTitle_ProductSubcategoryId",
                table: "OrderPosition",
                columns: new[] { "ProductTitle", "ProductSubcategoryId" },
                principalTable: "Product",
                principalColumns: new[] { "Title", "SubcategoryId" },
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Photo_Galery_GaleryId",
                table: "Photo",
                column: "GaleryId",
                principalTable: "Galery",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Photo_Product_ProductTitle_ProductSubcategoryId",
                table: "Photo",
                columns: new[] { "ProductTitle", "ProductSubcategoryId" },
                principalTable: "Product",
                principalColumns: new[] { "Title", "SubcategoryId" },
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Product_Subcategory_SubcategoryId",
                table: "Product",
                column: "SubcategoryId",
                principalTable: "Subcategory",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Subcategory_Category_CategoryId",
                table: "Subcategory",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
