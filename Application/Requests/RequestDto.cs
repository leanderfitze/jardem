using Application.Profiles;

namespace Application.Requests
{
    public class RequestDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Details { get; set; }
        public string RequesterUserName { get; set; }
        public ICollection<Profile> Participants { get; set; }
    }
}