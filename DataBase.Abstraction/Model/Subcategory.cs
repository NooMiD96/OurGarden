﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DataBase.Abstraction.Model
{
    public class Subcategory : IAlias, IPhoto
    {
        [Required]
        [MaxLength(64)]
        public string SubcategoryId { get; set; }

        [Required]
        [MaxLength(64)]
        public string CategoryId { get; set; }

        [Required]
        [MaxLength(64)]
        public string Alias { get; set; }

        [Required]
        public bool? IsVisible { get; set; }

        [MaxLength(70)]
        public string SeoTitle { get; set; }

        [MaxLength(150)]
        public string SeoDescription { get; set; }

        [MaxLength(512)]
        public string SeoKeywords { get; set; }

        //Parent
        public Category Category { get; set; }

        //Childrens
        public ICollection<Photo> Photos { get; set; }
        public ICollection<Product> Products { get; set; }
    }
}
