namespace Model
{
    public class EmailServiceConfigurationOptions
    {
        /// <summary>
        /// Папка с шаблонами писем
        /// </summary>
        public string TemplatesFolder { get; set; }

        /// <summary>
        /// Кого нужно так же оповестить.
        /// </summary>
        public string ReplyToMail { get; set; }

        /// <summary>
        /// Имя файла с шаблоном отправки письма заказа для администратора
        /// </summary>
        public string OrderAdminTemplateName { get; set; }

        /// <summary>
        /// Имя файла с шаблоном отправки письма заказа для клиента
        /// </summary>
        public string OrderClientTemplateName { get; set; }

        /// <summary>
        /// Имя файла с шаблоном отправки письма обратной связи для клиента
        /// </summary>
        public string FeedbackAdminTemplateName { get; set; }

        /// <summary>
        /// Имя файла с шаблоном отправки письма обратной связи для клиента
        /// </summary>
        public string FeedbackClientTemplateName { get; set; }

        /// <summary>
        /// Начало макроса, по которому будет формироваться список товаров
        /// </summary>
        public string ProductListMacrosStart { get; set; }

        /// <summary>
        /// Конец макроса, по которому будет формироваться список товаров
        /// </summary>
        public string ProductListMacrosEnd { get; set; }
    }
}
