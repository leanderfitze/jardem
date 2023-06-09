using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any() && !context.Requests.Any())
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

                var requests = new List<Request>
            {
                new Request
                {
                    Title = "Someone stalkers me!",
                    Date = DateTime.UtcNow.AddDays(-1 ),
                    Details = "After school person is stalkering me!",
                    Users = new List<UserRequest>{
                        new UserRequest{
                            AppUser = users[0],
                            IsRequester = true
                        }
                    }
                },
                new Request
                {
                    Title = "I am afraid of my friend",
                    Date = DateTime.UtcNow.AddHours(-12),
                    Details = "He is taking some drugs",
                    Users = new List<UserRequest>{
                        new UserRequest{
                            AppUser = users[2],
                            IsRequester = true
                        },
                        new UserRequest{
                            AppUser = users[1],
                            IsRequester = false
                        }
                    }
                },
                new Request
                {
                    Title = "Help",
                    Date = DateTime.UtcNow.AddDays(-2),
                    Details = "Request 2 days ago, someone asks for help",
                    Users = new List<UserRequest>{
                        new UserRequest{
                            AppUser = users[0],
                            IsRequester = true
                        },
                        new UserRequest{
                            AppUser = users[1],
                            IsRequester = false
                        },
                        new UserRequest{
                            AppUser = users[3],
                            IsRequester = false
                        }
                    }

                },
                new Request
                {
                    Title = "I am lost",
                    Date = DateTime.UtcNow.AddMonths(-2),
                    Details = "Someone is lost in the forest",
                    Users = new List<UserRequest>{
                        new UserRequest{
                            AppUser = users[0],
                            IsRequester = true
                        },
                        new UserRequest{
                            AppUser = users[1],
                            IsRequester = false
                        },
                    }
                }
            };

                await context.Requests.AddRangeAsync(requests);
                await context.SaveChangesAsync();
            }
        }
    }
}