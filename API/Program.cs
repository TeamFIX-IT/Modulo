global using API.Data;
global using Microsoft.EntityFrameworkCore;
global using API.Models.Entities;
global using API.Models.DTOs;
global using API.Services.EmailServices;
using API.Logic;
using Azure.Storage.Blobs;
using System.Text.Json.Serialization;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
// var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.



builder.Services.AddControllers();
builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
//adding datacontexet
builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
//adding blob storage
builder.Services.AddScoped(options =>
{
    return new BlobServiceClient(builder.Configuration.GetConnectionString("AzureConnection"));
});


var provider = builder.Services.BuildServiceProvider();
var configuration = provider.GetRequiredService<IConfiguration>();

// Connection to frontend
builder.Services.AddCors(options =>
{

    var clientURL = configuration.GetValue<String>("Client_URL");

    options.AddDefaultPolicy(builder =>
      {
          builder.WithOrigins(clientURL).AllowAnyMethod().AllowAnyHeader();
      }
      );
});
builder.Services.AddScoped<IFileManagerLogic, FileManagerLogic>();
//Adding CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      builder =>
                      {
                          builder.WithOrigins("http://localhost:3000")
                          .AllowAnyHeader()
                            .AllowAnyMethod()
                               .AllowCredentials();
                      });
});

// var provider = builder.Services.BuildServiceProvider();
// var configuration = provider.GetRequiredService<IConfiguration>(); 

// //Connection to frontend
// builder.Services.AddCors(options => {

//     var clientURL = configuration.GetValue<String>("Client_URL");

//     options.AddDefaultPolicy(builder =>
//     {
//         builder.WithOrigins(clientURL).AllowAnyMethod().AllowAnyHeader();
//     }
//     );
// });

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IEmailService, EmailService>();


// builder.Services.AddCors(options =>
// {
//     options.AddPolicy(name: MyAllowSpecificOrigins,
//                       policy =>
//                       {
//                           policy.WithOrigins("http://localhost:3000")
//                           .AllowAnyHeader()
//                                 .AllowAnyMethod();
//                       });
// });




var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);
// app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();
