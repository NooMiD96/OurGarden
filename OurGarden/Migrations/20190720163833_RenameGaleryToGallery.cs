using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class RenameGaleryToGallery : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photo_Galery_GalleryGaleryId",
                table: "Photo");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Galery",
                table: "Galery");

            migrationBuilder.RenameTable(
                name: "Galery",
                newName: "Gallery");

            migrationBuilder.RenameColumn(
                name: "GalleryGaleryId",
                table: "Photo",
                newName: "GalleryId");

            migrationBuilder.RenameIndex(
                name: "IX_Photo_GalleryGaleryId",
                table: "Photo",
                newName: "IX_Photo_GalleryId");

            migrationBuilder.RenameColumn(
                name: "GaleryId",
                table: "Gallery",
                newName: "GalleryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Gallery",
                table: "Gallery",
                column: "GalleryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Photo_Gallery_GalleryId",
                table: "Photo",
                column: "GalleryId",
                principalTable: "Gallery",
                principalColumn: "GalleryId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photo_Gallery_GalleryId",
                table: "Photo");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Gallery",
                table: "Gallery");

            migrationBuilder.RenameTable(
                name: "Gallery",
                newName: "Galery");

            migrationBuilder.RenameColumn(
                name: "GalleryId",
                table: "Photo",
                newName: "GalleryGaleryId");

            migrationBuilder.RenameIndex(
                name: "IX_Photo_GalleryId",
                table: "Photo",
                newName: "IX_Photo_GalleryGaleryId");

            migrationBuilder.RenameColumn(
                name: "GalleryId",
                table: "Galery",
                newName: "GaleryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Galery",
                table: "Galery",
                column: "GaleryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Photo_Galery_GalleryGaleryId",
                table: "Photo",
                column: "GalleryGaleryId",
                principalTable: "Galery",
                principalColumn: "GaleryId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
