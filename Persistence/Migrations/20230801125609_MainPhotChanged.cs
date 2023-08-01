using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class MainPhotChanged : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Photos_MainPhotoId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_MainPhotoId",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "MainPhotoId",
                table: "AspNetUsers",
                newName: "MainPhoto");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MainPhoto",
                table: "AspNetUsers",
                newName: "MainPhotoId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_MainPhotoId",
                table: "AspNetUsers",
                column: "MainPhotoId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Photos_MainPhotoId",
                table: "AspNetUsers",
                column: "MainPhotoId",
                principalTable: "Photos",
                principalColumn: "Id");
        }
    }
}
