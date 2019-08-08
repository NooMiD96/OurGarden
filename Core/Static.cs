using static Core.Helpers.JsonHelper;

namespace Core
{
    public static class Object
    {
        public static T DeepClone<T> (this T data)
        {
            var stringData = Serialize(data);

            return Deserialize<T>(stringData);
        }
    }
}
