using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Model.DB
{
    public class Category
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [MaxLength(64)]
        public string Name { get; set; }

        [Required]
        [MaxLength(64)]
        public string Alias { get; set; }

        public virtual IEnumerable<Subcategory> Subcategories { get; set; }
    }
}
