using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
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