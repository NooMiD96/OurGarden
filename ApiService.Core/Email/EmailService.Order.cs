using ApiService.Abstraction.Core;

using Core.Helpers;
using Core.Utils;

using DataBase.Abstraction.Model;

using MimeKit;

using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ApiService.Core.Email
{
    public partial class EmailService : IEmailService
    {
        private string CreateOrderBodySubject(int orderId, DateTime date)
        {
            var formatDate = date.ToString("dd-MM-yyyy HH:mm:ss");

            var subject = $"Новый заказ №{orderId} ({formatDate}).";

            return subject;
        }

        private string GetAdminOrderTextBody(Order order)
        {
            return $"Здравствуйте! На сайте поступил новый заказ №{order.OrderId}.";
        }

        private string GetClientOrderTextBody(Order order)
        {
            return $"Здравствуйте, {order.FIO}! Заказ №{order.OrderId} на сумму {order.TotalPrice} был подтвержден. Чтобы узнать подробности, перейдите по данному письму.";
        }

        /// <summary>
        /// Формирует текст сообщения из переданного имени шаблона с указанным содержимым тела сообщения.
        /// </summary>
        /// <param name="order">Заказ</param>
        /// <param name="templateFile">Имя файла</param>
        /// <param name="textBody">Тело сообщения</param>
        private async Task<MimeEntity> CreateOrderBody(Order order, string templateFile, string textBody)
        {
            var templateString = GetMjmlTemplateString(
                Path.Join(
                    Directory.GetCurrentDirectory(),
                    _emailServiceOptions.TemplatesFolder
                ),
                templateFile
            );

            var bodyMjmlFormattedString =
                GetOrderBodyMjmlFormattedString(
                    GetBaseBodyMjmlFormattedString(
                        templateString,
                        order.FIO,
                        order.Phone,
                        order.Email
                    ),
                    order
                );

            string htmlMessage;
            try
            {
                var mjmlMessage = await RenderMjml(bodyMjmlFormattedString);
                htmlMessage = mjmlMessage.Html;
            }
            catch (Exception ex)
            {
                throw new Exception(
                    $"Ошибка при отправке письма по заказу {order.OrderId} по шаблону {templateFile}" +
                        $"Заказ:\n{JsonHelper.Serialize(order)}",
                    ex
                );
            }

            var body = new BodyBuilder
            {
                HtmlBody = htmlMessage,
                TextBody = textBody
            };

            return body.ToMessageBody();
        }

        public string GetOrderBodyMjmlFormattedString(string templateString, Order order)
        {
            var startIndex = templateString
                .IndexOf(
                    _emailServiceOptions.ProductListMacrosStart,
                    StringComparison.InvariantCultureIgnoreCase
                ) + _emailServiceOptions.ProductListMacrosStart.Length;

            var endIndex = templateString
                .IndexOf(
                    _emailServiceOptions.ProductListMacrosEnd,
                    startIndex,
                    StringComparison.InvariantCultureIgnoreCase
                );
            var productItemTemplate = templateString[startIndex..endIndex];

            var productListString = order.OrderPositions
                .Select(
                    x => productItemTemplate.Replace("{{ProductId}}", x.Product.Alias, StringComparison.InvariantCultureIgnoreCase)
                                            .Replace("{{CategoryId}}", x.Product.Subcategory.Category.Alias, StringComparison.InvariantCultureIgnoreCase)
                                            .Replace("{{SubcategoryId}}", x.Product.Subcategory.Alias, StringComparison.InvariantCultureIgnoreCase)
                                            .Replace("{{Number}}", x.Number.ToString(), StringComparison.InvariantCultureIgnoreCase)
                                            .Replace("{{ProductPrice}}", x.Product.Price.ToString(), StringComparison.InvariantCultureIgnoreCase)
                                            .Replace(
                                                "{{ProductImageUrl}}",
                                                WebUtils.GenerateSiteAddress(
                                                    _rootOptions.HostName,
                                                    x.Product.Photos.FirstOrDefault().PreviewUrl
                                                        ?? x.Product.Photos.FirstOrDefault().Url
                                                ),
                                                StringComparison.InvariantCultureIgnoreCase
                                            )
                                            .Replace("{{ProductImageAlt}}", x.Product.Alias, StringComparison.InvariantCultureIgnoreCase)
                                            .Replace(
                                                "{{ProductUrl}}",
                                                WebUtils.GenerateSiteAddress(
                                                    _rootOptions.HostName,
                                                    $"Catalog/{x.CategoryId}/{x.SubcategoryId}/{x.ProductId}"
                                                ),
                                                StringComparison.InvariantCultureIgnoreCase
                                            )
                )
                .Aggregate((acc, str) => acc + str);

            return templateString
                .Replace("{{OrderId}}", order.OrderId.ToString(), StringComparison.InvariantCultureIgnoreCase)
                .Replace(
                    $"{_emailServiceOptions.ProductListMacrosStart}{productItemTemplate}{_emailServiceOptions.ProductListMacrosEnd}",
                    productListString,
                    StringComparison.InvariantCultureIgnoreCase)
                .Replace("{{TotalPrice}}", order.TotalPrice.ToString(), StringComparison.InvariantCultureIgnoreCase);
        }

        /// <summary>
        /// Получение заказа со всей внутренней информацией.
        /// </summary>
        /// <param name="orderId"></param>
        /// <returns></returns>
        private async Task<Order> GetOrderItemsInformation(int orderId)
        {
            var order = await _repository.GetOrder(orderId, true);

            await _repository.LoadPhotoCollection(
                order.OrderPositions.Select(x => x.Product)
            );

            return order;
        }
    }
}
