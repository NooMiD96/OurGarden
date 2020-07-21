namespace ApiService.Abstraction.Model
{
    public class ServiceExecuteResult<T>
    {
        public bool IsSuccess {get;set;}

        public T Result { get; set; }

        public string Error { get; set; }
    }
}
