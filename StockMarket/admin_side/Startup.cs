using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
//using admin_side.models;
using admin_side.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using admin_side.Models;


namespace admin_side
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "admin_side", Version = "v1" });
            });
            services.Configure<ApplicationSettings>(Configuration.GetSection("ApplicationSettings"));
            services.Configure<CompanyDatabaseSettings>(
                Configuration.GetSection(nameof(CompanyDatabaseSettings)));

            services.AddSingleton<ICompanyDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<CompanyDatabaseSettings>>().Value);

            services.Configure<SectorDatabaseSettings>(
                Configuration.GetSection(nameof(SectorDatabaseSettings)));

            services.AddSingleton<ISectorDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<SectorDatabaseSettings>>().Value);

            services.Configure<Stock_dataDatabaseSettings>(
                      Configuration.GetSection(nameof(Stock_dataDatabaseSettings)));

            services.AddSingleton<IStock_dataDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<Stock_dataDatabaseSettings>>().Value);


            services.Configure<exchangeDatabaseSettings>(
                      Configuration.GetSection(nameof(exchangeDatabaseSettings)));

            services.AddSingleton<IexchangeDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<exchangeDatabaseSettings>>().Value);

            services.Configure<IPODatabaseSettings>(
                Configuration.GetSection(nameof(IPODatabaseSettings)));

            services.AddSingleton<IIPODatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<IPODatabaseSettings>>().Value);
            services.AddSingleton<CompanyService>();
            services.AddSingleton<exchangeService>();
            services.AddSingleton<IPOService>();
            services.AddSingleton<SectorService>();
            services.AddSingleton<Stock_dataService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "admin_side v1"));
            }

            app.UseHttpsRedirection();

            app.UseCors(builder =>
                  builder.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod());
            app.UseAuthentication();
            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
