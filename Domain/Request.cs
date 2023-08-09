namespace Domain
{
    public class Request
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Details { get; set; }
        public bool Resolved { get; set; }
        public ICollection<UserRequest> Users { get; set; } = new List<UserRequest>();
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    }
}