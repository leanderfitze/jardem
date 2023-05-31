using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser{DisplayName="Alex", UserName="alex", Email="alex@test.com", UserType=UserType.Requester},
                    new AppUser{DisplayName="John", UserName="john", Email="john@test.com", UserType=UserType.Volunteer},
                    new AppUser{DisplayName="Jane", UserName="jane", Email="jane@test.com", UserType=UserType.Requester},
                    new AppUser{DisplayName="Max", UserName="max", Email="max@test.com", UserType=UserType.Volunteer},
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            if (context.Requests.Any()) return;

            var requests = new List<Request>
            {
                new Request
                {
                    Title = "Someone stalkers me!",
                    Date = DateTime.UtcNow.AddDays(-1 ),
                    Details = "After school person is stalkering me!"
                },
                new Request
                {
                    Title = "I am afraid of my friend",
                    Date = DateTime.UtcNow.AddHours(-12),
                    Details = "He is taking some drugs"
                },
                new Request
                {
                    Title = "Help",
                    Date = DateTime.UtcNow.AddDays(-2),
                    Details = "Request 2 days ago, someone asks for help"
                },
                new Request
                {
                    Title = "I am lost",
                    Date = DateTime.UtcNow.AddMonths(-2),
                    Details = "Someone is lost in the forest"
                }
            };

            await context.Requests.AddRangeAsync(requests);
            await context.SaveChangesAsync();
        }
    }
}