using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public UserType UserType { get; set; }
        public ICollection<UserRequest> Requests { get; set; }
        public ICollection<Photo> Photos { get; set; }
        public string MainPhoto { get; set; }
    }
}