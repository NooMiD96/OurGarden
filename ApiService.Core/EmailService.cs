using ApiService.Abstraction.Core;
using ApiService.Abstraction.DTO;

using DataBase.Abstraction.Repositories;

using EmailService.Abstraction;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Mjml.AspNetCore;

using Model;

using System;
using System.Threading.Tasks;

namespace ApiService.Core
{
    public partial class EmailService : IEmailService
    {
        #region Fields

        private readonly ILogger _logger;

        private readonly IOurGardenRepository _repository;
        
        private readonly IMjmlServices _mjmlServices;

        private readonly EmailOption _emailOption;
        
        private readonly IEmailSender _emailSender;

        #endregion

        #region .ctor

        /// <summary>
        /// .ctor
        /// </summary>
        public EmailService(ILogger<EmailService> logger,
                            IOurGardenRepository repository,
                            IMjmlServices mjmlServices,
                            IOptions<EmailOption> emailOption,
                            IEmailSender emailSender)
        {
            _logger = logger;
            _repository = repository;
            _mjmlServices = mjmlServices;
            _emailOption = emailOption.Value;
            _emailSender = emailSender;
        }

        #endregion

        #region IEmailService Impl

        /// //TODO:
        /// <inheritdoc/>
        public Task SendFeedback(FeedbackDTO feedbackDTO)
        {
            throw new NotImplementedException();
        }


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
                    _emailSender.SendEmailAsync(order.Email, subject, clientBodyInner),
                    _emailSender.SendEmailAsync(_emailOption.ReplyToLocalMail, subject, adminBodyInner)
                );
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Ошибка при отправке письма:");
            }
        }

        #endregion
    }
}
