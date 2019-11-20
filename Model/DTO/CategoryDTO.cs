using Microsoft.AspNetCore.Http;

using Model.Interfaces.DTO;

using System.ComponentModel.DataAnnotations;

namespace Model.DTO
{
    public class CategoryDTO : IPhotoDTO
    {
        public string CategoryId { get; set; }

        [Required]
        [MaxLength(64)]
        public string Alias { get; set; }

        public bool? IsVisible { get; set; }

        public IFormFileCollection AddFiles { get; set; }

        public IFormFileCollection UpdateFiles { get; set; }

        public string RemoveFiles { get; set; }
    }
}
