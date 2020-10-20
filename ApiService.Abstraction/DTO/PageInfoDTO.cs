using Microsoft.AspNetCore.Http;

using System.ComponentModel.DataAnnotations;

namespace ApiService.Abstraction.DTO
{
    public class PageInfoDTO : IPhotoDTO
    {
        public int PageInfoId { get; set; }

        #region IAlias

        [Required]
        public string Alias { get; set; }

        #endregion

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
        public bool IsAliasCanBeEdited
        {
            get => PageInfoId != HomePageId && PageInfoId != DesignPageId;
        }

        #region Static Pages Id

        public static int HomePageId { get; } = 1;

        public static int DesignPageId { get; } = 2;

        #endregion

        public IFormFileCollection AddFiles { get; set; }

        public IFormFileCollection UpdateFiles { get; set; }

        public string RemoveFiles { get; set; }
    }
}
