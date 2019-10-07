using Microsoft.AspNetCore.Http;

using System.ComponentModel.DataAnnotations;

namespace Model.DTO
{
    public class CategoryDTO
    {
        public string CategoryId { get; set; }

        [Required]
        [MaxLength(64)]
        public string Alias { get; set; }

        public bool? IsVisible { get; set; }

        public IFormFile File { get; set; }
    }
}
