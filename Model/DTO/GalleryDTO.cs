using Microsoft.AspNetCore.Http;

using Model.Interfaces.DTO;

using System.ComponentModel.DataAnnotations;

namespace Model.DTO
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
