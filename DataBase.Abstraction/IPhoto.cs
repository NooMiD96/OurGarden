using DataBase.Abstraction.Model;

using System.Collections.Generic;

namespace DataBase.Abstraction
{
    public interface IPhoto
    {
        ICollection<Photo> Photos { get; set; }
    }
}
