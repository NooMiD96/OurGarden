using Microsoft.AspNetCore.Http;

using System.ComponentModel.DataAnnotations;

namespace ApiService.Abstraction.DTO
{
    public class GalleryDTO : IPhotoDTO
    {
        public int GalleryId { get; set; }

        [Required]
        public string Name { get; set; }

        public bool? IsVisible { get; set; }

        public IFormFileCollection AddFiles { get; set; }

        public IFormFileCollection UpdateFiles { get; set; }

        public string RemoveFiles { get; set; }
    }
}
