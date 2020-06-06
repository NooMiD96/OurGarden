#pragma warning disable CA1065 // Do not raise exceptions in unexpected locations

using Microsoft.Extensions.Configuration;

using System;

namespace Web
{
    public static class StartUpVendors
    {
        public static IConfiguration Configuration { set; get; }

        private static string _serverPhysicalPath = null;
        private static string _serverFileName = null;

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

    }
}

#pragma warning restore CA1065 // Do not raise exceptions in unexpected locations
