using Microsoft.Extensions.Configuration;

using System;
using System.IO;

namespace Web
{
    public static class StartUpVendors
    {
        public static IConfiguration Configuration { set; get; }

        private static string[] _cssVendors = { };
        private static string[] _jsVendors = { };
        private static string _clientPhysicalPath = null;
        private static string _clientFileName = null;
        private static string _serverPhysicalPath = null;
        private static string _serverFileName = null;
        private static string _spaPublicPath = null;

        public static string[] CssVendors
        {
            set { _cssVendors = value; }
            get
            {
                if (_cssVendors.Length == 0)
                {
                    if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development")
                        Console.WriteLine("css vendor is empty");
                    _cssVendors = GetVendors("css", GetSrcPath);
                }
                return _cssVendors;
            }
        }
        public static string[] JsVendors
        {
            set { _jsVendors = value; }
            get
            {
                if (_jsVendors.Length == 0)
                {
                    if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development")
                        Console.WriteLine("js vendor is empty");
                    _jsVendors = GetVendors("js", GetSrcPath);
                }
                return _jsVendors;
            }
        }

        public static string ClientPhysicalPath
        {
            set { _clientPhysicalPath = value; }
            get
            {
                if (_clientPhysicalPath == null)
                {
                    _clientPhysicalPath = Path.Combine(
                        Directory.GetCurrentDirectory(),
                        Configuration.GetValue("SpaPhysicalClientPath", ""));
                    if (String.IsNullOrEmpty(_clientPhysicalPath))
                        throw new MissingFieldException("clientPhysicalPath is not found, please check appsettings.json (SpaPhysicalClientPath)");
                }
                return _clientPhysicalPath;
            }
        }
        public static string ServerPhysicalPath
        {
            set { _serverPhysicalPath = value; }
            get
            {
                if (_serverPhysicalPath == null)
                {
                    _serverPhysicalPath = Configuration.GetValue("SpaPhysicalServerPath", "");
                    if (String.IsNullOrEmpty(_serverPhysicalPath))
                        throw new MissingFieldException("serverPhysicalPath is not found, please check appsettings.json (SpaPhysicalServerPath)");
                }
                return _serverPhysicalPath;
            }
        }

        public static string ClientFileName
        {
            set
            {
                _clientFileName = value;
            }
            get
            {
                if (_clientFileName == null)
                {
                    _clientFileName = Configuration.GetValue<string>("SpaClientFileName");
                    if (String.IsNullOrEmpty(_clientFileName))
                        throw new MissingFieldException("clientFileName is not found, please check appsettings.json (SpaClientFileName)");
                }
                return _clientFileName;
            }
        }
        public static string ServerFileName
        {
            set { _serverFileName = value; }
            get
            {
                if (_serverFileName == null)
                {
                    _serverFileName = Configuration.GetValue<string>("SpaServerFileName");
                    if (String.IsNullOrEmpty(_serverFileName))
                        throw new MissingFieldException("serverFileName is not found, please check appsettings.json (SpaServerFileName)");
                }
                return _serverFileName;
            }
        }

        public static string SpaPublicPath
        {
            set { _spaPublicPath = value; }
            get
            {
                if (_spaPublicPath == null)
                {
                    _spaPublicPath = Configuration.GetValue<string>("SpaPublicPath");
                    if (String.IsNullOrEmpty(_spaPublicPath))
                        throw new MissingFieldException("spaPublicPath is not found, please check appsettings.json (SpaPublicPath)");
                }
                return _spaPublicPath;
            }
        }

        private static string GetSrcPath(string fileName) =>
            $"~/{SpaPublicPath}/{fileName}";
        private static string[] GetVendors(string extension = "js", Func<string, string> getSrcPath = null)
        {
            var clientDir = new DirectoryInfo(ClientPhysicalPath);
            var clientFiles = clientDir.GetFiles($"*{ClientFileName}*.{extension}");

            var resultVendors = new string[clientFiles.Length];

            for (var i = 0; i < clientFiles.Length; i++)
                if (getSrcPath != null)
                    resultVendors[i] = getSrcPath(clientFiles[i].Name);

            return resultVendors;
        }
    }
}
