namespace DataBase.Abstraction
{
    public interface IBreadcrumb
    {
        string DisplayName { get; set; }
        string Url { get; set; }
        int Order { get; set; }
    }
}
