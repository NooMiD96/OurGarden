using PhotoService.Abstraction.Model;

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataBase.Abstraction.Model
{
    public class News : IAlias, IPhoto, ISeoInformation
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        [MaxLength(128)]
        public string NewsId { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        [MaxLength(128)]
        public string Alias { get; set; }

        [MaxLength(128)]
        public string SeoTitle { get; set; }

        [MaxLength(256)]
        public string SeoDescription { get; set; }

        [MaxLength(512)]
        public string SeoKeywords { get; set; }

        [Required]
        public string Description { get; set; }

        public ICollection<Photo> Photos { get; set; }
    }
}
