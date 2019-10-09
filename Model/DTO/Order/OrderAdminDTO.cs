using Model.DB;

using System;
using System.Collections.Generic;

namespace Model.DTO.Order
{
    public class OrderAdminDTO
    {
        public int OrderId { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public string FIO { get; set; }

        public DateTime Date { get; set; }

        public string Description { get; set; }

        public double TotalPrice { get; set; }

        public IEnumerable<OrderPositionAdminDTO> OrderPositions { get; set; }

        public int StatusId { get; set; }

        public OrderStatus Status { get; set; }
    }
}
