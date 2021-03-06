﻿namespace Model
{
    public class EmailOptions
    {
        /// <summary>
        /// Сервер email, через который отправляется.
        /// </summary>
        public string Server { get; set; }

        /// <summary>
        /// Порт
        /// </summary>
        public int Port { get; set; }

        /// <summary>
        /// От лица кого отправляется письмо.
        /// </summary>
        public string SenderName { get; set; }

        /// <summary>
        /// Email отправителя письма.
        /// </summary>
        public string Sender { get; set; }

        /// <summary>
        /// Пароль
        /// </summary>
        public string Password { get; set; }
    }
}
