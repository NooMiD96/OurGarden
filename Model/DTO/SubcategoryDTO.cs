using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Model.DTO
{
    public class SubcategoryDTO
    {
        public string SubcategoryId { get; set; }

        public string CategoryId { get; set; }

        public string NewCategoryId { get; set; }

        [MaxLength(64)]
        public string Alias { get; set; }

        public string Url{ get; set; }
    }
}
