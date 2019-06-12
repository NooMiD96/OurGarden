using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Core.Helpers
{
    public static class JsonHelper
    {
        public static readonly JsonSerializerSettings JsonSettings = new JsonSerializerSettings
        {
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
            NullValueHandling = NullValueHandling.Ignore,
            ContractResolver = new CamelCasePropertyNamesContractResolver(),
        };

        public static string Serialize<T>(T obj) => JsonConvert.SerializeObject(obj, JsonSettings);

        public static T Deserialize<T>(string json) => JsonConvert.DeserializeObject<T>(json);
    }
}
