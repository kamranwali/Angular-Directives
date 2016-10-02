using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(RealTimeAngular.Startup))]

namespace RealTimeAngular
{
    public class Startup
    {
        private BackgroundTicker _backgroundTicker;
        public void Configuration(IAppBuilder app)
        {
            _backgroundTicker = new BackgroundTicker();
            app.MapSignalR();
        }
    }
}
