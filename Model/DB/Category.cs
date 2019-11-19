﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Model.DB
{
    public class Category
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        [MaxLength(64)]
        public string CategoryId { get; set; }

        [Required]
        [MaxLength(64)]
        public string Alias { get; set; }

        [Required]
        public bool? IsVisible { get; set; }

        //Childrens
        public ICollection<Subcategory> Subcategories { get; set; }
        public ICollection<Photo> Photos { get; set; }
    }
}
