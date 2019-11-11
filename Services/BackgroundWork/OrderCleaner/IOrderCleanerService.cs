using System.Threading.Tasks;

namespace Services.BackgroundWork.OrderCleaner
{
    public interface IOrderCleanerService
    {
        Task DoWork();
    }
}
