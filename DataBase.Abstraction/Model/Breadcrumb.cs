namespace DataBase.Abstraction.Model
{
    public class Breadcrumb : IBreadcrumb
    {
        public string DisplayName { get; set; }
        public string Url { get; set; }
        public int Order { get; set; }
    }
}
