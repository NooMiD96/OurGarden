using Microsoft.AspNetCore.Http;

using System.ComponentModel.DataAnnotations;

namespace ApiService.Abstraction.DTO
{
    public class CategoryDTO : IPhotoDTO
    {
        public string CategoryId { get; set; }

        [Required]
        [MaxLength(64)]
        public string Alias { get; set; }

        public bool? IsVisible { get; set; }

        public string SeoTitle { get; set; }

        public string SeoDescription { get; set; }

        public string SeoKeywords { get; set; }

        public IFormFileCollection AddFiles { get; set; }

        public IFormFileCollection UpdateFiles { get; set; }

        public string RemoveFiles { get; set; }
    }
}
