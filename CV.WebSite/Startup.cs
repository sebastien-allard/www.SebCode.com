using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using AutoMapper;
using SendGrid;
using CV.WebSite.Extensions;
using CV.WebSite.Services;
using CV.Data.Extensions;

namespace CV.WebSite
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
            services.AddDatabase(Configuration);
            services.AddAutoMapper(typeof(CV.WebSite.App_Start.AutoMapperProfile));

            // --- Dependency injection ---------------------------------
            var sendGridApiKey = Configuration.GetValue<string>("SendGrid:ApiKey");
            services.AddSingleton<ISendGridClient>(sp => new SendGridClient(sendGridApiKey));
            services.AddScoped<IResumeService, ResumeService>();
            services.AddSingleton<IEmailService, EmailService>();
            services.AddSingleton<IReCaptchaService, ReCaptchaService>();

            //services.AddAuthentication(AzureADDefaults.JwtBearerAuthenticationScheme)
            //    .AddAzureADBearer(options => Configuration.Bind("AzureAd", options));

            //services.AddAuthentication(AzureADB2CDefaults.BearerAuthenticationScheme)
            //    .AddAzureADB2CBearer(options => Configuration.Bind("AzureAd", options));

            // Adds Microsoft Identity platform (AAD v2.0) support to protect this API
            //services
            //    .AddAuthentication(AzureADDefaults.JwtBearerAuthenticationScheme)
            //    .AddMicrosoftIdentityWebApi(Configuration, "AzureAd");

            services.AddAuthorization(Configuration);

            services.AddControllersWithViews();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            //services.AddMvc();
            services.AddRazorPages();

            // Register the Swagger services
            services.AddSwaggerDocument(configure =>
            {
                configure.Title = "Curriculum Vitæ";
                configure.PostProcess = document =>
                {
                    document.Info.Contact = new NSwag.OpenApiContact
                    {
                        Name = "Sébastien Allard",
                        Email = string.Empty,
                        Url = "https://www.sebcode.com"
                    };
                };
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            // Register the Swagger generator and the Swagger UI middlewares
            app.UseOpenApi();
            app.UseSwaggerUi3();

            //app.UseMvc();


            //app.UseCors(builder =>
            //{
            //    builder
            //        .WithOrigins("https://localhost:44388")
            //        .AllowCredentials()
            //        .AllowAnyMethod()
            //        .AllowAnyHeader();
            //});

            app.UseRouting();


            //app.SetDefaultSignInAsAuthenticationType(CookieAuthenticationDefaults.AuthenticationType);

            //app.UseCookieAuthentication(new CookieAuthenticationOptions());

            //app.UseOpenIdConnectAuthentication(new OpenIdConnectAuthenticationOptions
            //{
            //    // Generate the metadata address using the tenant and policy information
            //    MetadataAddress = string.Format(AadInstance, Tenant, SignUpSignInPolicyId),

            //    // These are standard OpenID Connect parameters, with values pulled from web.config
            //    ClientId = ClientId,
            //    RedirectUri = RedirectUri,
            //    PostLogoutRedirectUri = RedirectUri,

            //    // Specify the callbacks for each type of notifications
            //    Notifications = new OpenIdConnectAuthenticationNotifications
            //    {
            //        RedirectToIdentityProvider = OnRedirectToIdentityProvider,
            //        AuthenticationFailed = OnAuthenticationFailed
            //    },

            //    // Specify the claims to validate
            //    TokenValidationParameters = new TokenValidationParameters
            //    {
            //        NameClaimType = "name"
            //    }
            //});


            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "api/{controller}/{action=Index}/{id?}");
                endpoints.MapRazorPages();
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
