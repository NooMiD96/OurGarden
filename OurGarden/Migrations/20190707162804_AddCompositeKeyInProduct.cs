using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class AddCompositeKeyInProduct : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderPosition_Product_ProductId",
                table: "OrderPosition");

            migrationBuilder.DropForeignKey(
                name: "FK_Photo_Product_ProductId",
                table: "Photo");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Product",
                table: "Product");

            migrationBuilder.DropIndex(
                name: "IX_Photo_ProductId",
                table: "Photo");

            migrationBuilder.DropIndex(
                name: "IX_OrderPosition_ProductId",
                table: "OrderPosition");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Product");

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

            migrationBuilder.AddPrimaryKey(
                name: "TitleToSubcategory_Product",
                table: "Product",
                columns: new[] { "Title", "SubcategoryId" });

            migrationBuilder.CreateIndex(
                name: "IX_Photo_ProductTitle_ProductSubcategoryId",
                table: "Photo",
                columns: new[] { "ProductTitle", "ProductSubcategoryId" });

            migrationBuilder.CreateIndex(
                name: "IX_OrderPosition_ProductTitle_ProductSubcategoryId",
                table: "OrderPosition",
                columns: new[] { "ProductTitle", "ProductSubcategoryId" });

            migrationBuilder.AddForeignKey(
                name: "FK_OrderPosition_Product_ProductTitle_ProductSubcategoryId",
                table: "OrderPosition",
                columns: new[] { "ProductTitle", "ProductSubcategoryId" },
                principalTable: "Product",
                principalColumns: new[] { "Title", "SubcategoryId" },
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Photo_Product_ProductTitle_ProductSubcategoryId",
                table: "Photo",
                columns: new[] { "ProductTitle", "ProductSubcategoryId" },
                principalTable: "Product",
                principalColumns: new[] { "Title", "SubcategoryId" },
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderPosition_Product_ProductTitle_ProductSubcategoryId",
                table: "OrderPosition");

            migrationBuilder.DropForeignKey(
                name: "FK_Photo_Product_ProductTitle_ProductSubcategoryId",
                table: "Photo");

            migrationBuilder.DropPrimaryKey(
                name: "TitleToSubcategory_Product",
                table: "Product");

            migrationBuilder.DropIndex(
                name: "IX_Photo_ProductTitle_ProductSubcategoryId",
                table: "Photo");

            migrationBuilder.DropIndex(
                name: "IX_OrderPosition_ProductTitle_ProductSubcategoryId",
                table: "OrderPosition");

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

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Product",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Product",
                table: "Product",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Photo_ProductId",
                table: "Photo",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderPosition_ProductId",
                table: "OrderPosition",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderPosition_Product_ProductId",
                table: "OrderPosition",
                column: "ProductId",
                principalTable: "Product",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Photo_Product_ProductId",
                table: "Photo",
                column: "ProductId",
                principalTable: "Product",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
