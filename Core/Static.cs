using Core.Helpers;

namespace Core
{
    public static class Object
    {
        public static T DeepClone<T> (this T data)
        {
            var stringData = JsonHelper.Serialize(data);

            return JsonHelper.Deserialize<T>(stringData);
        }
    }
}
