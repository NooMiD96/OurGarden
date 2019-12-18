using System.Threading.Tasks;

namespace Services.BackgroundWork.DummyWorker
{
    public interface IDummyWorkerService
    {
        Task DoWork();
    }
}
