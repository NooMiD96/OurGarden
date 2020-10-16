﻿using PhotoService.Abstraction.Model;

using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataBase.Abstraction.Model
{
    public class PageInfo : IAlias, ISeoInformation, IPhoto
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PageInfoId { get; set; }

        #region IAlias
        
        [Required]
        [MaxLength(128)]
        public string Alias { get; set; }

        #endregion

        [Required]
        public string Description { get; set; }

        #region ISeoInformation

        [MaxLength(128)]
        public string SeoTitle { get; set; }

        [MaxLength(256)]
        public string SeoDescription { get; set; }

        [MaxLength(512)]
        public string SeoKeywords { get; set; }

        #endregion

        /// <summary>
        /// Можно ли изменить поле Alias
        /// </summary>
        public bool IsAliasCanBeEdited {
            get => PageInfoId != HomePageId && PageInfoId != DesignPageId;
        }

        #region Static Pages Id

        public static int HomePageId { get; } = 1;

        public static int DesignPageId { get; } = 2;

        #endregion

        #region Childrens
        
        public ICollection<Photo> Photos { get; set; }

        #endregion
    }
}