using Database.Contexts;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

using MimeKit;

using Model.DB;

using System;
using System.Linq;
using System.Threading.Tasks;

namespace Services.EMail
{
    public partial class EmailSender
    {
        const string _LocalMail = "ourgarden@xn----7sbbq5b0a1c.com";
        const string _templateClient = @"
<div style='>
    <!--[if mso | IE]>
      <table
         align='center' border='0' cellpadding='0' cellspacing='0' class=' style='width:600px;' width='600'
      >
        <tr>
          <td style='line-height:0px;font-size:0px;mso-line-height-rule:exactly;'>
      
        <v:rect  style='width:600px;' xmlns:v='urn:schemas-microsoft-com:vml' fill='true' stroke='false'>
        <v:fill  origin='0.5, 0' position='0.5, 0' src='https://xn----7sbbq5b0a1c.com/email/mainBackground.jpg' type='tile' />
        <v:textbox style='mso-fit-shape-to-text:true' inset='0,0,0,0'>
      <![endif]-->
    <div style='background:url(https://xn----7sbbq5b0a1c.com/email/mainBackground.jpg) top center / 100% no-repeat;Margin:0px auto;max-width:600px;'>
      <div style='line-height:0;font-size:0;'>
        <table align='center' background='https://xn----7sbbq5b0a1c.com/email/mainBackground.jpg' border='0' cellpadding='0' cellspacing='0' role='presentation' style='background:url(https://xn----7sbbq5b0a1c.com/email/mainBackground.jpg) top center / 100% no-repeat;width:100%;'>
          <tbody>
            <tr>
              <td style='direction:ltr;font-size:0px;padding:20px 0;padding-top:5px;text-align:center;vertical-align:top;'>
                <!--[if mso | IE]>
                  <table role='presentation' border='0' cellpadding='0' cellspacing='0'>
                
        <tr>
      
            <td
               class=' style='vertical-align:top;width:600px;'
            >
          <![endif]-->
                <div class='mj-column-per-100 outlook-group-fix' style='font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;'>
                  <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='vertical-align:top;' width='100%'>
                    <tr>
                      <td align='left' style='font-size:0px;padding:10px 25px;padding-top:0px;padding-left:25%;word-break:break-word;'>
                        <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='border-collapse:collapse;border-spacing:0px;'>
                          <tbody>
                            <tr>
                              <td style='width:100px;'> <img alt='Наш Сад' height='auto' src='https://xn----7sbbq5b0a1c.com/email/logo.png' style='border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;' width='100'>                                </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style='font-size:0px;word-break:break-word;'>
                        <!--[if mso | IE]>
    
        <table role='presentation' border='0' cellpadding='0' cellspacing='0'><tr><td height='10' style='vertical-align:top;height:10vw;'>
      
    <![endif]-->
                        <div style='height:10vw;'> &nbsp; </div>
                        <!--[if mso | IE]>
    
        </td></tr></table>
      
    <![endif]-->
                      </td>
                    </tr>
                    <tr>
                      <td style='font-size:0px;word-break:break-word;'>
                        <!--[if mso | IE]>
    
        <table role='presentation' border='0' cellpadding='0' cellspacing='0'><tr><td height='0' style='vertical-align:top;height:0.75vh;'>
      
    <![endif]-->
                        <div style='height:0.75vh;'> &nbsp; </div>
                        <!--[if mso | IE]>
    
        </td></tr></table>
      
    <![endif]-->
                      </td>
                    </tr>
                    <tr>
                      <td align='left' style='font-size:0px;padding:10px 25px;word-break:break-word;'>
                        <div style='font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:14px;line-height:1;text-align:left;color:#444444;'> Здравствуйте, {{FIO}}! </div>
                      </td>
                    </tr>
                    <tr>
                      <td align='left' style='font-size:0px;padding:10px 25px;word-break:break-word;'>
                        <div style='font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:14px;line-height:1;text-align:left;color:#444444;'> Ваш заказ {{OrderId}} подтвержден. </div>
                      </td>
                    </tr>
                  </table>
                </div>
                <!--[if mso | IE]>
            </td>
          
            <td
               class='order-info-table-wrapper-outlook' style='vertical-align:top;width:600px;'
            >
          <![endif]-->
                <div class='mj-column-per-100 outlook-group-fix order-info-table-wrapper' style='font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;'>
                  <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='vertical-align:top;' width='100%'>
                    <tr>
                      <td align='left' style='font-size:0px;padding:10px 25px;word-break:break-word;'>
                        <div style='font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:18px;font-weight:bold;line-height:1;text-align:left;color:#75b726;'> Информация о заказе: </div>
                      </td>
                    </tr>
                  </table>
                </div>
                <!--[if mso | IE]>
            </td>
          
            <td
               class=' style='vertical-align:top;width:600px;'
            >
          <![endif]-->
                <div class='mj-column-per-100 outlook-group-fix' style='font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;'>
                  <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='vertical-align:top;' width='100%'>
                    <tr>
                      <td align='left' class='order-info-table' style='font-size:0px;padding:0px;word-break:break-word;'>
                        <table cellpadding='0' cellspacing='0' width='100%' border='0' style='cellspacing: 0; color: #000000; font-family: Ubuntu, Helvetica, Arial, sans-serif; font-size: 13px; line-height: 22px; table-layout: inherit; width: 100%; word-break: keep-all;'>
                          <tr style='text-align:left;padding:15px 0;'>
                            <th style='padding: 0 10px;width: 60%;color:#75b726'><span style='font-size: 16px'>Продукт</span></th>
                            <th style='padding: 0 0 0 10px;width: 40%;color:#75b726'><span style='font-size: 16px'>Цена</span></th>
                          </tr> {tableMap[
                          <tr>
                            <td style='padding: 0 10px 0 0;'><span>{{ProductId}}</span><br><span style='color:#999999'>{{CategoryId}}, {{SubcategoryId}}</span><br><span style='font-size:12px;color:#999999'>Количество: {{Number}}</span></td>
                            <td style='padding: 0 0 0 10px;'>{{ProductPrice}} руб.</td>
                          </tr>]} </table>
                      </td>
                    </tr>
                  </table>
                </div>
                <!--[if mso | IE]>
            </td>
          
            <td
               class='order-info-table-wrapper-outlook' style='vertical-align:top;width:600px;'
            >
          <![endif]-->
                <div class='mj-column-per-100 outlook-group-fix order-info-table-wrapper' style='font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;'>
                  <table border='0' cellpadding='0' cellspacing='0' role='presentation' width='100%'>
                    <tbody>
                      <tr>
                        <td style='vertical-align:top;padding-top:20px;'>
                          <table border='0' cellpadding='0' cellspacing='0' role='presentation' style=' width='100%'>
                            <tr>
                              <td align='left' style='font-size:0px;padding:10px 25px;word-break:break-word;'>
                                <div style='font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:16px;line-height:1;text-align:left;color:#000000;'> <span style='color:#75b726;font-weight:bold;font-size:16px'>Итоговая сумма заказа:&nbsp;</span>{{TotalPrice}} руб.</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!--[if mso | IE]>
            </td>
          
            <td
               class=' style='vertical-align:top;width:600px;'
            >
          <![endif]-->
                <div class='mj-column-per-100 outlook-group-fix' style='font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;'>
                  <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='vertical-align:top;' width='100%'>
                    <tr>
                      <td align='left' style='font-size:0px;padding:10px 25px;padding-top:25px;word-break:break-word;'>
                        <div style='font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#444444;'> Скоро мы с вами свяжемся! </div>
                      </td>
                    </tr>
                  </table>
                </div>
                <!--[if mso | IE]>
            </td>
          
        </tr>
      
                  </table>
                <![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!--[if mso | IE]>
        </v:textbox>
      </v:rect>
    
          </td>
        </tr>
      </table>
      <![endif]-->
  </div>
";

        const string _templateAdmin = @"
<div style=''>
    <!--[if mso | IE]>
      <table
         align='center' border='0' cellpadding='0' cellspacing='0' class='' style='width:600px;' width='600'
      >
        <tr>
          <td style='line-height:0px;font-size:0px;mso-line-height-rule:exactly;'>
      
        <v:rect  style='width:600px;' xmlns:v='urn:schemas-microsoft-com:vml' fill='true' stroke='false'>
        <v:fill  origin='0.5, 0' position='0.5, 0' src='https://xn----7sbbq5b0a1c.com/email/mainBackground.jpg' type='tile' />
        <v:textbox style='mso-fit-shape-to-text:true' inset='0,0,0,0'>
      <![endif]-->
    <div style='background:url(https://xn----7sbbq5b0a1c.com/email/mainBackground.jpg) top center / 100% no-repeat;Margin:0px auto;max-width:600px;'>
      <div style='line-height:0;font-size:0;'>
        <table align='center' background='https://xn----7sbbq5b0a1c.com/email/mainBackground.jpg' border='0' cellpadding='0' cellspacing='0' role='presentation' style='background:url(https://xn----7sbbq5b0a1c.com/email/mainBackground.jpg) top center / 100% no-repeat;width:100%;'>
          <tbody>
            <tr>
              <td style='direction:ltr;font-size:0px;padding:20px 0;padding-top:5px;text-align:center;vertical-align:top;'>
                <!--[if mso | IE]>
                  <table role='presentation' border='0' cellpadding='0' cellspacing='0'>
                
        <tr>
      
            <td
               class='' style='vertical-align:top;width:600px;'
            >
          <![endif]-->
                <div class='mj-column-per-100 outlook-group-fix' style='font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;'>
                  <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='vertical-align:top;' width='100%'>
                    <tr>
                      <td align='left' style='font-size:0px;padding:10px 25px;padding-top:0px;padding-left:25%;word-break:break-word;'>
                        <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='border-collapse:collapse;border-spacing:0px;'>
                          <tbody>
                            <tr>
                              <td style='width:100px;'> <img alt='Наш Сад' height='auto' src='https://xn----7sbbq5b0a1c.com/email/logo.png' style='border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;' width='100'>                                </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style='font-size:0px;word-break:break-word;'>
                        <!--[if mso | IE]>
    
        <table role='presentation' border='0' cellpadding='0' cellspacing='0'><tr><td height='10' style='vertical-align:top;height:10vw;'>
      
    <![endif]-->
                        <div style='height:10vw;'> &nbsp; </div>
                        <!--[if mso | IE]>
    
        </td></tr></table>
      
    <![endif]-->
                      </td>
                    </tr>
                    <tr>
                      <td style='font-size:0px;word-break:break-word;'>
                        <!--[if mso | IE]>
    
        <table role='presentation' border='0' cellpadding='0' cellspacing='0'><tr><td height='0' style='vertical-align:top;height:0.75vh;'>
      
    <![endif]-->
                        <div style='height:0.75vh;'> &nbsp; </div>
                        <!--[if mso | IE]>
    
        </td></tr></table>
      
    <![endif]-->
                      </td>
                    </tr>
                    <tr>
                      <td align='left' style='font-size:0px;padding:10px 25px;word-break:break-word;'>
                        <div style='font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:14px;line-height:1;text-align:left;color:#444444;'> Здравствуйте! </div>
                      </td>
                    </tr>
                    <tr>
                      <td align='left' style='font-size:0px;padding:10px 25px;word-break:break-word;'>
                        <div style='font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:14px;line-height:1;text-align:left;color:#444444;'> На сайте оформлен новый заказ №{{OrderId}}. </div>
                      </td>
                    </tr>
                  </table>
                </div>
                <!--[if mso | IE]>
            </td>
          
            <td
               class='' style='vertical-align:top;width:600px;'
            >
          <![endif]-->
                <div class='mj-column-per-100 outlook-group-fix' style='font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;'>
                  <table border='0' cellpadding='0' cellspacing='0' role='presentation' width='100%'>
                    <tbody>
                      <tr>
                        <td style='vertical-align:top;padding-top:20px;'>
                          <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='' width='100%'>
                            <tr>
                              <td align='left' style='font-size:0px;padding:10px 25px;word-break:break-word;'>
                                <div style='font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:18px;font-weight:bold;line-height:1;text-align:left;color:#75b726;'> Информация о покупателе: </div>
                              </td>
                            </tr>
                            <tr>
                              <td align='left' class='order-info-table' style='font-size:0px;padding:0px;word-break:break-word;'>
                                <table cellpadding='0' cellspacing='0' width='100%' border='0' style='cellspacing: 0; color: #000000; font-family: Ubuntu, Helvetica, Arial, sans-serif; font-size: 13px; line-height: 22px; table-layout: inherit; width: 100%; word-break: keep-all;'>
                                  <tr style='text-align:left;padding:15px 0;'>
                                    <td style='width: 60%;'>ФИО</td>
                                    <td style='width: 40%;'>{{FIO}}</td>
                                  </tr>
                                  <tr style='text-align:left;padding:15px 0;'>
                                    <td style='width: 60%;'>Номер</td>
                                    <td style='width: 40%;'>{{Phone}}</td>
                                  </tr>
                                  <tr style='text-align:left;padding:15px 0;'>
                                    <td style='width: 60%;'>Почта</td>
                                    <td style='width: 40%;'>{{Email}}</td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!--[if mso | IE]>
            </td>
          
            <td
               class='order-info-table-wrapper-outlook' style='vertical-align:top;width:600px;'
            >
          <![endif]-->
                <div class='mj-column-per-100 outlook-group-fix order-info-table-wrapper' style='font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;'>
                  <table border='0' cellpadding='0' cellspacing='0' role='presentation' width='100%'>
                    <tbody>
                      <tr>
                        <td style='vertical-align:top;padding-top:20px;'>
                          <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='' width='100%'>
                            <tr>
                              <td align='left' style='font-size:0px;padding:10px 25px;word-break:break-word;'>
                                <div style='font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:18px;font-weight:bold;line-height:1;text-align:left;color:#75b726;'> Информация о заказе: </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!--[if mso | IE]>
            </td>
          
            <td
               class='' style='vertical-align:top;width:600px;'
            >
          <![endif]-->
                <div class='mj-column-per-100 outlook-group-fix' style='font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;'>
                  <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='vertical-align:top;' width='100%'>
                    <tr>
                      <td align='left' class='order-info-table' style='font-size:0px;padding:0px;word-break:break-word;'>
                        <table cellpadding='0' cellspacing='0' width='100%' border='0' style='cellspacing: 0; color: #000000; font-family: Ubuntu, Helvetica, Arial, sans-serif; font-size: 13px; line-height: 22px; table-layout: inherit; width: 100%; word-break: keep-all;'>
                          <tr style='text-align:left;padding:15px 0;'>
                            <th style='padding: 0 10px;width: 60%;color:#75b726'><span style='font-size: 16px'>Продукт</span></th>
                            <th style='padding: 0 0 0 10px;width: 40%;color:#75b726'><span style='font-size: 16px'>Цена</span></th>
                          </tr> {tableMap[
                          <tr>
                            <td style='padding: 0 10px 0 0;'><span>{{ProductId}}</span><br><span style='color:#999999'>{{CategoryId}}, {{SubcategoryId}}</span><br><span style='font-size:12px;color:#999999'>Количество: {{Number}}</span></td>
                            <td style='padding: 0 0 0 10px;'>{{ProductPrice}} руб.</td>
                          </tr>]} </table>
                      </td>
                    </tr>
                  </table>
                </div>
                <!--[if mso | IE]>
            </td>
          
            <td
               class='order-info-table-wrapper-outlook' style='vertical-align:top;width:600px;'
            >
          <![endif]-->
                <div class='mj-column-per-100 outlook-group-fix order-info-table-wrapper' style='font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;'>
                  <table border='0' cellpadding='0' cellspacing='0' role='presentation' width='100%'>
                    <tbody>
                      <tr>
                        <td style='vertical-align:top;padding-top:20px;'>
                          <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='' width='100%'>
                            <tr>
                              <td align='left' style='font-size:0px;padding:10px 25px;word-break:break-word;'>
                                <div style='font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:16px;line-height:1;text-align:left;color:#000000;'> <span style='color:#75b726;font-weight:bold;font-size:16px'>Итоговая сумма заказа:&nbsp;</span> {{TotalPrice}} руб.</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!--[if mso | IE]>
            </td>
          
        </tr>
      
                  </table>
                <![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!--[if mso | IE]>
        </v:textbox>
      </v:rect>
    
          </td>
        </tr>
      </table>
      <![endif]-->
  </div>
";

        private static string CreateOrderBodySubject(Order order)
        {
            var formatDate = order.Date.ToString("dd-MM-yyyy HH:mm:ss");
            var orderId = order.OrderId;

            var subject = $"Новый заказ №{orderId} ({formatDate}).";

            return subject;
        }

        private static MimeEntity CreateOrderBody(Order order)
        {
            var startTableMap = "{tableMap[";
            var endTableMap = "]}";
            var startIndex = _templateAdmin.IndexOf(startTableMap, StringComparison.InvariantCultureIgnoreCase) + startTableMap.Length;
            var endIndex = _templateAdmin.IndexOf(endTableMap, startIndex, StringComparison.InvariantCultureIgnoreCase);
            var tableDataTemplate = _templateAdmin.Substring(
                startIndex,
                endIndex - startIndex
            );

            var body = new BodyBuilder
            {
                HtmlBody = _templateAdmin
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
                    .Replace("{{TotalPrice}}", order.TotalPrice.ToString(), StringComparison.InvariantCultureIgnoreCase),
                TextBody = $@"Здравствуйте! На сайте поступил новый заказ заказ №{order.OrderId}. От {order.FIO}, {order.Phone}"
            };

            return body.ToMessageBody();
        }

        private static MimeEntity CreateClientOrderBody(Order order)
        {
            var startTableMap = "{tableMap[";
            var endTableMap = "]}";
            var startIndex = _templateClient.IndexOf(startTableMap, StringComparison.InvariantCultureIgnoreCase) + startTableMap.Length;
            var endIndex = _templateClient.IndexOf(endTableMap, startIndex, StringComparison.InvariantCultureIgnoreCase);
            var tableDataTemplate = _templateClient.Substring(
                startIndex,
                endIndex - startIndex
            );

            var body = new BodyBuilder
            {
                HtmlBody = _templateClient
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
                    .Replace("{{TotalPrice}}", order.TotalPrice.ToString(), StringComparison.InvariantCultureIgnoreCase),
                TextBody = $@"Здравствуйте, {order.FIO}! Заказ №{order.OrderId} на сумму {order.TotalPrice} был подтвержден. Чтобы узнать подробности, перейдите по данному письму."
            };

            return body.ToMessageBody();
        }

        (string email, string subject, MimeEntity bodyInner, MimeEntity clientBodyInner) CreateOrderEmailInformation(Order order)
        {
            return (
                order.Email,
                CreateOrderBodySubject(order),
                CreateOrderBody(order),
                CreateClientOrderBody(order)
            );
        }
        async Task<Order> GetOrderItemsInformation(int orderId)
        {
            // when we exit the using block,
            // the IServiceScope will dispose itself 
            // and dispose all of the services that it resolved.
            using (var scope = _scopeFactory.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<OurGardenContext>();

                var order = await context.Order
                    .Include(x => x.OrderPositions)
                        .ThenInclude(x => x.Product)
                            .ThenInclude(x => x.Subcategory)
                                .ThenInclude(x => x.Category)
                    .FirstAsync(x => x.OrderId == orderId);

                return order;
            }
        }

        public async Task SendOrderInformation(int orderId)
        {
            try
            {
                var order = await GetOrderItemsInformation(orderId);

                var (email, subject, bodyInner, clientBodyInner) = CreateOrderEmailInformation(order);

                await SendEmailAsync(_LocalMail, subject, bodyInner);
                await SendEmailAsync(email, subject, clientBodyInner);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"SendOrderInformation: {ex.Message}");
            }
        }
    }
}
