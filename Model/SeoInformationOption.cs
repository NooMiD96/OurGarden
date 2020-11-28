namespace Model
{
    public class SeoInformationOption
    {
        public SeoInformationSection Subcategory { get; set; }
        public SeoInformationSection ProductList { get; set; }
        public SeoInformationSection Product { get; set; }
        public SeoInformationSection News { get; set; }
    }

    public class SeoInformationSection
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Keywords { get; set; }
    }
}
