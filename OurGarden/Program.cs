using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Serilog;

namespace Web;

public class Program
{
    public static void Main(string[] args)
    {
        using var app = Host.CreateDefaultBuilder(args)
            .UseSerilog()
            .UseSystemd()
            .ConfigureWebHostDefaults(webHostBuilder => {
                webHostBuilder.ConfigureKestrel(k =>
                {
                    k.AddServerHeader = false;
                });
                webHostBuilder.UseStartup<Startup>();
            })
            .Build();

        app.Run();
    }
}
