using Domain;

namespace Application.Profiles
{
    public class Profile
    {
        public string UserName { get; set; }
        public string DisplayName { get; set; }
        public UserType UserType { get; set; }
        public string Image { get; set; }

    }
}