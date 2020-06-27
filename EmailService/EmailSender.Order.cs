using DataBase.Abstraction.Model;
using DataBase.Abstraction.Repositories;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

using MimeKit;

using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace EmailService
{
    public partial class EmailSender
    {
        #region Consts

        const string _templatesFolder = "wwwroot/Templates";

        const string _templateClientFileName = "MJML_TemplateClient.html";

        const string _templateAdminFileName = "MJML_TemplateAdmin.html";

        #endregion

        #region IEmailSender Impl

        /// <inheritdoc/>
        public async Task SendOrderInformation(int orderId)
        {
            try
            {
                var order = await GetOrderItemsInformation(orderId);

                var subject = CreateOrderBodySubject(order.OrderId, order.Date);

                var clientBodyInner = await CreateClientOrderBody(order);
                var adminBodyInner = await CreateAdminOrderBody(order);

                await Task.WhenAll(
                    SendEmailAsync(order.Email, subject, clientBodyInner),
                    SendEmailAsync(_emailOption.ReplyToLocalMail, subject, adminBodyInner)
                );
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Ошибка при отправке письма:");
            }
        }

        #endregion

        private string CreateOrderBodySubject(int orderId, DateTime date)
        {
            var formatDate = date.ToString("dd-MM-yyyy HH:mm:ss");

            var subject = $"Новый заказ №{orderId} ({formatDate}).";

            return subject;
        }

        private async Task<MimeEntity> CreateAdminOrderBody(Order order)
        {
            const string startTableMap = "{tableMap[";
            const string endTableMap = "]}";

            var templateString = await GetMjmlTemplateString(
                Path.Join(
                    Directory.GetCurrentDirectory(),
                    _templatesFolder,
                    _templateAdminFileName
                )
            );

            var startIndex = templateString.IndexOf(startTableMap, StringComparison.InvariantCultureIgnoreCase) + startTableMap.Length;
            var endIndex = templateString.IndexOf(endTableMap, startIndex, StringComparison.InvariantCultureIgnoreCase);
            var tableDataTemplate = templateString[startIndex..endIndex];

            var bodyMjmlFormattedString = templateString
                .Replace("{{OrderId}}", order.OrderId.ToString(), StringComparison.InvariantCultureIgnoreCase)
                .Replace("{{FIO}}", order.FIO, StringComparison.InvariantCultureIgnoreCase)
                .Replace("{{Phone}}", order.Phone, StringComparison.InvariantCultureIgnoreCase)
                .Replace("{{Email}}", order.Email, StringComparison.InvariantCultureIgnoreCase)
                .Replace(
                    $"{{tableMap[{tableDataTemplate}]}}",
                    order.OrderPositions
                        .Select(
                            x => tableDataTemplate.Replace("{{ProductId}}", x.Product.Alias, StringComparison.InvariantCultureIgnoreCase)
                                                    .Replace("{{CategoryId}}", x.Product.Subcategory.Category.Alias, StringComparison.InvariantCultureIgnoreCase)
                                                    .Replace("{{SubcategoryId}}", x.Product.Subcategory.Alias, StringComparison.InvariantCultureIgnoreCase)
                                                    .Replace("{{Number}}", x.Number.ToString(), StringComparison.InvariantCultureIgnoreCase)
                                                    .Replace("{{ProductPrice}}", x.Product.Price.ToString(), StringComparison.InvariantCultureIgnoreCase)
                        )
                        .Aggregate((acc, str) => acc + str),
                    StringComparison.InvariantCultureIgnoreCase)
                .Replace("{{TotalPrice}}", order.TotalPrice.ToString(), StringComparison.InvariantCultureIgnoreCase);

            var mjmlMessage = await _mjmlServices.Render(bodyMjmlFormattedString);
            if (string.IsNullOrEmpty(mjmlMessage.Html) && (mjmlMessage.Errors?.Length ?? -1) != 0)
            {
                throw new Exception(
                    $"Ошибка при отправке письма: {mjmlMessage.Errors.Select(x => x.Message).Aggregate((acc, val) => $"{acc}, {val}")}"
                );
            }

            var body = new BodyBuilder
            {
                HtmlBody = mjmlMessage.Html,
                TextBody = $@"Здравствуйте! На сайте поступил новый заказ заказ №{order.OrderId}. От {order.FIO}, {order.Phone}"
            };

            return body.ToMessageBody();
        }

        private async Task<MimeEntity> CreateClientOrderBody(Order order)
        {
            const string startTableMap = "{tableMap[";
            const string endTableMap = "]}";

            var templateString = await GetMjmlTemplateString(
                Path.Join(
                    Directory.GetCurrentDirectory(),
                    _templatesFolder,
                    _templateClientFileName
                )
            );

            var startIndex = templateString.IndexOf(startTableMap, StringComparison.InvariantCultureIgnoreCase) + startTableMap.Length;
            var endIndex = templateString.IndexOf(endTableMap, startIndex, StringComparison.InvariantCultureIgnoreCase);
            var tableDataTemplate = templateString[startIndex..endIndex];

            var bodyMjmlFormattedString = templateString
                .Replace("{{FIO}}", order.FIO, StringComparison.InvariantCultureIgnoreCase)
                .Replace("{{OrderId}}", order.OrderId.ToString(), StringComparison.InvariantCultureIgnoreCase)
                .Replace(
                    $"{{tableMap[{tableDataTemplate}]}}",
                    order.OrderPositions
                        .Select(
                            x => tableDataTemplate.Replace("{{ProductId}}", x.Product.Alias, StringComparison.InvariantCultureIgnoreCase)
                                                    .Replace("{{CategoryId}}", x.Product.Subcategory.Category.Alias, StringComparison.InvariantCultureIgnoreCase)
                                                    .Replace("{{SubcategoryId}}", x.Product.Subcategory.Alias, StringComparison.InvariantCultureIgnoreCase)
                                                    .Replace("{{Number}}", x.Number.ToString(), StringComparison.InvariantCultureIgnoreCase)
                                                    .Replace("{{ProductPrice}}", x.Product.Price.ToString(), StringComparison.InvariantCultureIgnoreCase)
                        )
                        .Aggregate((acc, str) => acc + str),
                    StringComparison.InvariantCultureIgnoreCase)
                .Replace("{{TotalPrice}}", order.TotalPrice.ToString(), StringComparison.InvariantCultureIgnoreCase);

            var mjmlMessage = await _mjmlServices.Render(bodyMjmlFormattedString);
            if (string.IsNullOrEmpty(mjmlMessage.Html) && (mjmlMessage.Errors?.Length ?? -1) != 0)
            {
                throw new Exception(
                    $"Ошибка при отправке письма: {mjmlMessage.Errors.Select(x => x.Message).Aggregate((acc, val) => $"{acc}, {val}")}"
                );
            }

            var body = new BodyBuilder
            {
                HtmlBody = mjmlMessage.Html,
                TextBody = $@"Здравствуйте, {order.FIO}! Заказ №{order.OrderId} на сумму {order.TotalPrice} был подтвержден. Чтобы узнать подробности, перейдите по данному письму."
            };

            return body.ToMessageBody();
        }

        private async Task<Order> GetOrderItemsInformation(int orderId)
        {
            using var scope = _scopeFactory.CreateScope();
            var dbRepository = scope.ServiceProvider.GetRequiredService<IOurGardenRepository>();

            var order = await dbRepository.GetOrder(orderId, true);

            return order;
        }

        private async Task<string> GetMjmlTemplateString(string filePath)
        {
            var template = File.ReadAllText(filePath);

            return await Task.FromResult(template);
        }
    }
}
