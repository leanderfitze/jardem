using Domain;

namespace Application.Requests
{
    public class ParticipantDto
    {
        public string UserName { get; set; }
        public string DisplayName { get; set; }
        public UserType UserType { get; set; }
        public string Image { get; set; }
    }
}