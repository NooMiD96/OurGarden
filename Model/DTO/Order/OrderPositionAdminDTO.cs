namespace Model.DTO.Order
{
    public class OrderPositionAdminDTO
    {
        public int OrderPositionId { get; set; }

        public int Number { get; set; }

        public double Price { get; set; }

        public string OldProductAlias { get; set; }

        public string ProductId { get; set; }
        public string ProductAlias { get; set; }
        public string SubcategoryId { get; set; }
        public string SubcategoryAlias { get; set; }
        public string CategoryId { get; set; }
        public string CategoryAlias { get; set; }

        public int OrderId { get; set; }
    }
}
