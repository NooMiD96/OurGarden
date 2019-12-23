using Microsoft.AspNetCore.Http;

using Model.Interfaces.DTO;

using System;
using System.ComponentModel.DataAnnotations;

namespace Model.DTO
{
    public class NewsDTO : IPhotoDTO
    {
        public int NewsId { get; set; }

        [Required]
        public string Title { get; set; }

        public DateTime Date { get; set; }

        [Required]
        public string Description { get; set; }

        public IFormFileCollection AddFiles { get; set; }

        public IFormFileCollection UpdateFiles { get; set; }

        public string RemoveFiles { get; set; }
    }
}
