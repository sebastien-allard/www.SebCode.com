using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace CV.WebSite.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void AddAuthorization(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAuthentication()
                .AddJwtBearer("AAD", options =>
                {
                    options.MetadataAddress = configuration["AzureAd:Instance"] + configuration["AzureAd:TenantId"] +
                                              "/v2.0/.well-known/openid-configuration";
                    options.Authority = configuration["AzureAd:Instance"] + configuration["AzureAd:TenantId"];
                    options.Audience = configuration["AzureAd:ClientId"];
                    options.TokenValidationParameters =
                        new TokenValidationParameters
                        {
                            ValidIssuer = $"https://sts.windows.net/{configuration["AzureAd:TenantId"]}/",
                        };
                    options.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context => Task.CompletedTask,
                        OnChallenge = context => Task.CompletedTask,
                        OnAuthenticationFailed = (context) =>
                        {
                            Console.WriteLine("OnAuthenticationFailed: " + context.Exception.Message);
                            return Task.CompletedTask;
                        },
                        OnTokenValidated = context =>
                        {
                            Console.WriteLine("Validated: " + context.SecurityToken);
                            return Task.CompletedTask;
                        }
                    };
                });

            services
                .AddAuthorization(options =>
                {
                    options.AddPolicy("AADUsers", new AuthorizationPolicyBuilder()
                        .RequireAuthenticatedUser()
                        .AddAuthenticationSchemes("AAD")
                        .Build());
                });
        }

    }
}
