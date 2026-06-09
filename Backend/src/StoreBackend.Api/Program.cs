using System.Text;
using System.Threading.RateLimiting;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using StoreBackend.DomainService;
using StoreBackend.Facade;
using StoreBackend.Infrastructure;
using StoreBackend.Infrastructure.Repositories;
<<<<<<< Updated upstream
=======
using StoreBackend.Api.Filters;
using StoreBackend.Api.Services;
>>>>>>> Stashed changes

var builder = WebApplication.CreateBuilder(args);


// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

<<<<<<< Updated upstream
=======
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")
    )
);

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IRoleRepository, RoleRepository>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IUserFacade, UserFacade>();
builder.Services.AddScoped<IAuthorizationFacade, AuthorizationFacade>();

builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IProductFacade, ProductFacade>();
builder.Services.AddScoped<ICategoryFacade, CategoryFacade>();
builder.Services.AddScoped<IImageService, ImageService>();

>>>>>>> Stashed changes
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
