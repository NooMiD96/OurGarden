using Microsoft.AspNetCore.Http;
using Model.DB;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Model.DTO
{
    public class GalleryDTO
    {
        public int GalleryId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        public IFormFileCollection AddFiles { get; set; }

        public string RemoveFiles { get; set; }
    }
}
