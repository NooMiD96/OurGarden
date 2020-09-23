namespace ApiService.Abstraction.Model
{
    /// <summary>
    /// Результат выполнения функции сервиса
    /// </summary>
    /// <typeparam name="T">Возвращаемый тип</typeparam>
    public class ServiceExecuteResult<T>
    {
        /// <summary>
        /// Успешность выполнения
        /// </summary>
        public bool IsSuccess {get;set;}

        /// <summary>
        /// Результат выполнения
        /// </summary>
        public T Result { get; set; }

        /// <summary>
        /// Ошибка, если в процессе выполнения была ошибка
        /// </summary>
        public string Error { get; set; }
    }
}
