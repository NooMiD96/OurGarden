using Microsoft.AspNetCore.Http;

using System;
using System.ComponentModel.DataAnnotations;

namespace ApiService.Abstraction.DTO
{
    public class NewsDTO : IPhotoDTO
    {
        public string NewsId { get; set; }

        [Required]
        public string Alias { get; set; }

        public DateTime Date { get; set; }

        [Required]
        public string Description { get; set; }

        public string SeoTitle { get; set; }
        
        public string SeoDescription { get; set; }

        public string SeoKeywords { get; set; }

        public IFormFileCollection AddFiles { get; set; }

        public IFormFileCollection UpdateFiles { get; set; }

        public string RemoveFiles { get; set; }
    }
}
