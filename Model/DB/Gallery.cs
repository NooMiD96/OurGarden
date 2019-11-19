using Microsoft.AspNetCore.Http;

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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

        public ICollection<Photo> Photos { get; set; }
    }
}
