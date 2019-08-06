using System;
using System.Collections.Generic;
using System.Text;

namespace Model.DTO
{
    public class OrderUpdateDTO
    {
        public int OrderId { get; set; }
        public int StatusId { get; set; }
        public string Description { get; set; }
    }
}
