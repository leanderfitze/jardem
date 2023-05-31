using Domain;

namespace API.DTOs
{
    /// A DTO for the properties that we want to send back 
    /// when a client has successfully logged in or register
    public class UserDto
    {
        public string DisplayName { get; set; }
        public string Token { get; set; }
        public string Image { get; set; }
        public string UserName { get; set; }
        public UserType UserType { get; set; }
    }
}