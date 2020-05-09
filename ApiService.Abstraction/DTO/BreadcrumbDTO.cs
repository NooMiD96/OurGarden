using DataBase.Abstraction;

namespace ApiService.Abstraction.DTO
{
    public class BreadcrumbDTO : IBreadcrumb
    {
        public string DisplayName { get; set; }
        public string Url { get; set; }
        public int Order { get; set; }
    }
}
