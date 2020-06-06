namespace Model
{
    public class SeoInformationOption
    {
        public SeoInformationSection Home { get; set; }
        public SeoInformationSection Category { get; set; }
        public SeoInformationSection Subcategory { get; set; }
        public SeoInformationSection ProductList { get; set; }
        public SeoInformationSection Product { get; set; }
        public SeoInformationSection NewsList { get; set; }
        public SeoInformationSection News { get; set; }
        public SeoInformationSection Payment { get; set; }
        public SeoInformationSection Design { get; set; }
        public SeoInformationSection RulonnyjGazon { get; set; }
        public SeoInformationSection Videogalery { get; set; }
        public SeoInformationSection Contacts { get; set; }
        public SeoInformationSection UserCard { get; set; }
    }

    public class SeoInformationSection
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Keywords { get; set; }
    }
}
