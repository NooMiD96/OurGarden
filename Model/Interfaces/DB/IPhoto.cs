using Model.DB;

using System.Collections.Generic;

namespace Model.Interfaces.DB
{
    public interface IPhoto
    {
        ICollection<Photo> Photos { get; set; }
    }
}
