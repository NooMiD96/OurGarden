using Core.Helpers;

using MimeKit;

using Model.DB;

using System.Linq;
using System.Threading.Tasks;

namespace Services.EMail
{
    public partial class EmailSender
    {
        string CreateOrderBodySubject(Order order)
        {
            var formatDate = order.Date.ToString("dd-MM-yyyy HH:mm:ss");
            var orderId = order.OrderId;

            var subject = $"Новый заказ №{orderId} ({formatDate}).";

            return subject;
        }

        MimeEntity CreateOrderBody(Order order)
        {
            var body = new BodyBuilder
            {
                HtmlBody = $@"
<div>ФИО</div>
<div>{order.FIO}</div>

<div>Номер</div>
<div>{order.Phone}</div>

<div>Почта</div>
<div>{order.Email}</div>

<div>Сумма заказа</div>
<div>{order.TotalPrice}</div>

<table>
    <thead>
        <tr>
            <td>Категория</td>
            <td>Подкатегория</td>
            <td>Продукт</td>
            <td>Кол-во</td>
            <td>Цена</td>
        </tr>
    </thead>
    <tbody>
        {
            order.OrderPositions.Select(x => $@"
        <tr>
            <td>{x.CategoryId.TransformFromId()}</td>
            <td>{x.SubcategoryId.TransformFromId()}</td>
            <td>{x.ProductId.TransformFromId()}</td>
            <td>{x.Number}</td>
            <td>{x.Product.Price}</td>
        </tr>
            ").Aggregate((acc, str) => acc + str)
        }
    </tbody>
</table>
",
                TextBody = $@"
Новый заказ!
ФИО - {order.FIO}
Номер - {order.Phone}
Почта - {order.Email}
Сумма заказа - {order.TotalPrice}
"
            };

            return body.ToMessageBody();
        }

        (string email, string subject, MimeEntity bodyInner) CreateOrderEmailInformation(Order order)
        {
            return (
                order.Email,
                CreateOrderBodySubject(order),
                CreateOrderBody(order)
            );
        }

        public async Task SendOrderInformation(Order order)
        {
            var (email, subject, bodyInner) = CreateOrderEmailInformation(order);

            await SendEmailAsync(email, subject, bodyInner);
        }
    }
}
