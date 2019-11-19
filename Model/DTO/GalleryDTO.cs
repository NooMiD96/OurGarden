using Microsoft.AspNetCore.Http;

using System.ComponentModel.DataAnnotations;

namespace Model.DTO
{
    public class GalleryDTO
    {
        public int GalleryId { get; set; }

        [Required]
        public string Name { get; set; }

        public IFormFileCollection AddFiles { get; set; }

        public string RemoveFiles { get; set; }
    }
}
