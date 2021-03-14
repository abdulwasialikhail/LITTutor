using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(DataContext context)
        {
            if (await context.Users.AnyAsync()) return;
            if (await context.Users.AnyAsync()) return;

            var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);
            foreach (var user in users)
            {
                using var hmac = new HMACSHA512();

                user.UserName = user.UserName.ToLower();
                //user.UserTypeId = 2;
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Test123$"));
                user.PasswordSalt = hmac.Key;

                context.Users.Add(user);
            }

            await context.SaveChangesAsync();
        }
        public static async Task SeedUserTypes(DataContext context)
        {
            if (await context.UserTypes.AnyAsync()) return;


            var userTypeData = await System.IO.File.ReadAllTextAsync("Data/UserTypeSeedData.json");
            var types = JsonSerializer.Deserialize<List<UserType>>(userTypeData);
            foreach (var type in types)
            {

                context.UserTypes.Add(type);
            }

            await context.SaveChangesAsync();
        }

        public static async Task SeedApplicationStatus(DataContext context)
        {
           if (await context.ApplicationStatuses.AnyAsync()) return;


            var applicationsStatusData = await System.IO.File.ReadAllTextAsync("Data/ApplicationStatusSeedData.json");
            var types = JsonSerializer.Deserialize<List<ApplicationStatus>>(applicationsStatusData);
            foreach (var type in types)
            {

                context.ApplicationStatuses.Add(type);
            }

            await context.SaveChangesAsync();
        }


    }
}