using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser: IdentityUser
    {
        public string DisplayName { get; set; }
        public UserType UserType { get; set; }
        public ICollection<UserRequest> Requests { get; set; }
    }
}