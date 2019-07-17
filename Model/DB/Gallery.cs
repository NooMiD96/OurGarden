using Core.Helpers;
using Microsoft.AspNetCore.Http;
using Model.DTO;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Model.DB
{
    public class Gallery
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int GalleryId { get; set; }

        [Required]
        [MaxLength(128)]
        public string Name { get; set; }

        [Required]
        [MaxLength(128)]
        public string Alias { get; set; }

        [Required]
        [MaxLength(256)]
        public string Description { get; set; }

        public ICollection<Photo> Photos { get; set; }

        [NotMapped]
        public IEnumerable<Guid> RemovePhotos { get; set; }
        [NotMapped]
        public IEnumerable<IFormFile> AddPhotos { get; set; }
    }
}
