using System.ComponentModel.DataAnnotations;
using Domain;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string DisplayName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}", ErrorMessage = "Password must be complex")]
        public string Password { get; set; }
        [Required]
        public UserType UserType { get; set; }
    }
}