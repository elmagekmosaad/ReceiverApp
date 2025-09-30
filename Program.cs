using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// Initialize Firebase Admin SDK
//FirebaseApp.Create(new AppOptions()
//{
//    Credential = GoogleCredential.FromFile("c:\\Users\\Mosaad\\Documents\\trae_projects\\firebasev1\\test-notification-94710-0a74796f9f8a.json")
//});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthorization();

app.MapStaticAssets();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}")
    .WithStaticAssets();


app.Run();
