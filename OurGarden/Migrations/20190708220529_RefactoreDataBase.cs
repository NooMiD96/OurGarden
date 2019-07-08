using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class RefactoreDataBase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Subcategory",
                table: "Subcategory");

            migrationBuilder.DropPrimaryKey(
                name: "TitleToSubcategory_Product",
                table: "Product");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Category",
                table: "Category");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Subcategory");

            migrationBuilder.DropColumn(
                name: "Manufacturer",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "VendorCode",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Category");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Video",
                newName: "VideoId");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Subcategory",
                newName: "SubcategoryId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Status",
                newName: "StatusId");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Product",
                newName: "ProductId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Photo",
                newName: "PhotoId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "OrderPosition",
                newName: "OrderPositionId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Order",
                newName: "OrderId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "News",
                newName: "NewsId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Galery",
                newName: "GaleryId");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Category",
                newName: "CategoryId");

            migrationBuilder.AlterColumn<Guid>(
                name: "PhotoId",
                table: "Subcategory",
                nullable: true,
                oldClrType: typeof(Guid));

            migrationBuilder.AlterColumn<string>(
                name: "CategoryId",
                table: "Subcategory",
                maxLength: 64,
                nullable: false,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<string>(
                name: "SubcategoryId",
                table: "Product",
                maxLength: 64,
                nullable: false,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<string>(
                name: "CategoryId",
                table: "Product",
                maxLength: 64,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "ProductId",
                table: "Photo",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "GaleryId",
                table: "Photo",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<string>(
                name: "ProductCategoryId",
                table: "Photo",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProductSubcategoryId",
                table: "Photo",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ProductId",
                table: "OrderPosition",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "OrderId",
                table: "OrderPosition",
                nullable: true);

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

            migrationBuilder.AlterColumn<string>(
                name: "FIO",
                table: "Order",
                maxLength: 128,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 256);

            migrationBuilder.AlterColumn<Guid>(
                name: "PhotoId",
                table: "News",
                nullable: true,
                oldClrType: typeof(Guid));

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "News",
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 512);

            migrationBuilder.AlterColumn<Guid>(
                name: "PhotoId",
                table: "Category",
                nullable: true,
                oldClrType: typeof(Guid));

            migrationBuilder.AddPrimaryKey(
                name: "PK_Subcategory",
                table: "Subcategory",
                columns: new[] { "SubcategoryId", "CategoryId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Product",
                table: "Product",
                columns: new[] { "ProductId", "SubcategoryId", "CategoryId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Category",
                table: "Category",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Subcategory_CategoryId",
                table: "Subcategory",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Product_SubcategoryId_CategoryId",
                table: "Product",
                columns: new[] { "SubcategoryId", "CategoryId" });

            migrationBuilder.CreateIndex(
                name: "IX_Photo_GaleryId",
                table: "Photo",
                column: "GaleryId");

            migrationBuilder.CreateIndex(
                name: "IX_Photo_ProductId_ProductSubcategoryId_ProductCategoryId",
                table: "Photo",
                columns: new[] { "ProductId", "ProductSubcategoryId", "ProductCategoryId" });

            migrationBuilder.CreateIndex(
                name: "IX_OrderPosition_OrderId",
                table: "OrderPosition",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderPosition_ProductId_ProductSubcategoryId_ProductCategoryId",
                table: "OrderPosition",
                columns: new[] { "ProductId", "ProductSubcategoryId", "ProductCategoryId" });

            migrationBuilder.CreateIndex(
                name: "IX_Order_StatusId",
                table: "Order",
                column: "StatusId");

            migrationBuilder.CreateIndex(
                name: "IX_News_PhotoId",
                table: "News",
                column: "PhotoId");

            migrationBuilder.CreateIndex(
                name: "IX_Category_PhotoId",
                table: "Category",
                column: "PhotoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Category_Photo_PhotoId",
                table: "Category",
                column: "PhotoId",
                principalTable: "Photo",
                principalColumn: "PhotoId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_News_Photo_PhotoId",
                table: "News",
                column: "PhotoId",
                principalTable: "Photo",
                principalColumn: "PhotoId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Status_StatusId",
                table: "Order",
                column: "StatusId",
                principalTable: "Status",
                principalColumn: "StatusId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderPosition_Order_OrderId",
                table: "OrderPosition",
                column: "OrderId",
                principalTable: "Order",
                principalColumn: "OrderId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderPosition_Product_ProductId_ProductSubcategoryId_ProductCategoryId",
                table: "OrderPosition",
                columns: new[] { "ProductId", "ProductSubcategoryId", "ProductCategoryId" },
                principalTable: "Product",
                principalColumns: new[] { "ProductId", "SubcategoryId", "CategoryId" },
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Photo_Galery_GaleryId",
                table: "Photo",
                column: "GaleryId",
                principalTable: "Galery",
                principalColumn: "GaleryId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Photo_Product_ProductId_ProductSubcategoryId_ProductCategoryId",
                table: "Photo",
                columns: new[] { "ProductId", "ProductSubcategoryId", "ProductCategoryId" },
                principalTable: "Product",
                principalColumns: new[] { "ProductId", "SubcategoryId", "CategoryId" },
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Product_Subcategory_SubcategoryId_CategoryId",
                table: "Product",
                columns: new[] { "SubcategoryId", "CategoryId" },
                principalTable: "Subcategory",
                principalColumns: new[] { "SubcategoryId", "CategoryId" },
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Subcategory_Category_CategoryId",
                table: "Subcategory",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "CategoryId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
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
                name: "FK_OrderPosition_Order_OrderId",
                table: "OrderPosition");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderPosition_Product_ProductId_ProductSubcategoryId_ProductCategoryId",
                table: "OrderPosition");

            migrationBuilder.DropForeignKey(
                name: "FK_Photo_Galery_GaleryId",
                table: "Photo");

            migrationBuilder.DropForeignKey(
                name: "FK_Photo_Product_ProductId_ProductSubcategoryId_ProductCategoryId",
                table: "Photo");

            migrationBuilder.DropForeignKey(
                name: "FK_Product_Subcategory_SubcategoryId_CategoryId",
                table: "Product");

            migrationBuilder.DropForeignKey(
                name: "FK_Subcategory_Category_CategoryId",
                table: "Subcategory");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Subcategory",
                table: "Subcategory");

            migrationBuilder.DropIndex(
                name: "IX_Subcategory_CategoryId",
                table: "Subcategory");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Product",
                table: "Product");

            migrationBuilder.DropIndex(
                name: "IX_Product_SubcategoryId_CategoryId",
                table: "Product");

            migrationBuilder.DropIndex(
                name: "IX_Photo_GaleryId",
                table: "Photo");

            migrationBuilder.DropIndex(
                name: "IX_Photo_ProductId_ProductSubcategoryId_ProductCategoryId",
                table: "Photo");

            migrationBuilder.DropIndex(
                name: "IX_OrderPosition_OrderId",
                table: "OrderPosition");

            migrationBuilder.DropIndex(
                name: "IX_OrderPosition_ProductId_ProductSubcategoryId_ProductCategoryId",
                table: "OrderPosition");

            migrationBuilder.DropIndex(
                name: "IX_Order_StatusId",
                table: "Order");

            migrationBuilder.DropIndex(
                name: "IX_News_PhotoId",
                table: "News");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Category",
                table: "Category");

            migrationBuilder.DropIndex(
                name: "IX_Category_PhotoId",
                table: "Category");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "ProductCategoryId",
                table: "Photo");

            migrationBuilder.DropColumn(
                name: "ProductSubcategoryId",
                table: "Photo");

            migrationBuilder.DropColumn(
                name: "OrderId",
                table: "OrderPosition");

            migrationBuilder.DropColumn(
                name: "ProductCategoryId",
                table: "OrderPosition");

            migrationBuilder.DropColumn(
                name: "ProductSubcategoryId",
                table: "OrderPosition");

            migrationBuilder.RenameColumn(
                name: "VideoId",
                table: "Video",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "SubcategoryId",
                table: "Subcategory",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "StatusId",
                table: "Status",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "ProductId",
                table: "Product",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "PhotoId",
                table: "Photo",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "OrderPositionId",
                table: "OrderPosition",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "OrderId",
                table: "Order",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "NewsId",
                table: "News",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "GaleryId",
                table: "Galery",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "CategoryId",
                table: "Category",
                newName: "Name");

            migrationBuilder.AlterColumn<Guid>(
                name: "PhotoId",
                table: "Subcategory",
                nullable: false,
                oldClrType: typeof(Guid),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "CategoryId",
                table: "Subcategory",
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 64);

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Subcategory",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AlterColumn<int>(
                name: "SubcategoryId",
                table: "Product",
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 64);

            migrationBuilder.AddColumn<string>(
                name: "Manufacturer",
                table: "Product",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "VendorCode",
                table: "Product",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ProductId",
                table: "Photo",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "GaleryId",
                table: "Photo",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ProductId",
                table: "OrderPosition",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "StatusId",
                table: "Order",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "FIO",
                table: "Order",
                maxLength: 256,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 128);

            migrationBuilder.AlterColumn<Guid>(
                name: "PhotoId",
                table: "News",
                nullable: false,
                oldClrType: typeof(Guid),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "News",
                maxLength: 512,
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<Guid>(
                name: "PhotoId",
                table: "Category",
                nullable: false,
                oldClrType: typeof(Guid),
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Category",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Subcategory",
                table: "Subcategory",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "TitleToSubcategory_Product",
                table: "Product",
                columns: new[] { "Title", "SubcategoryId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Category",
                table: "Category",
                column: "Id");
        }
    }
}
