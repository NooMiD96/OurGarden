using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Model.DTO
{
    public class ProductDTO
    {
        public string ProductId { get; set; }

        public string SubcategoryId { get; set; }

        public string CategoryId { get; set; }

        public string NewSubcategoryId { get; set; }

        public string NewCategoryId { get; set; }

        [MaxLength(64)]
        public string Alias { get; set; }

        public string Description { get; set; }

        public IEnumerable<Guid> RemovePhotos { get; set; }
        public IEnumerable<IFormFile> AddPhotos { get; set; }
    }
}
