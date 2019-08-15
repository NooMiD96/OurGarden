using Microsoft.AspNetCore.Http;

using Model.DB;

using System;
using System.ComponentModel.DataAnnotations;

namespace Model.DTO
{
    public class NewsDTO
    {
        public int NewsId { get; set; }

        [Required]
        public string Title { get; set; }

        public DateTime Date { get; set; }

        [Required]
        public string Description { get; set; }

        public IFormFile? File { get; set; }
    }
}
