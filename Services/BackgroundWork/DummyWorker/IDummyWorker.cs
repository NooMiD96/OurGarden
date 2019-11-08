using System.Threading.Tasks;

namespace Services.BackgroundWork.DummyWorker
{
    public interface IDummyWorker
    {
        Task DoLoopWork();
    }
}
