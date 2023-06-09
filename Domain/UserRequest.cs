namespace Domain
{
    public class UserRequest
    {
        public string  AppUserId { get; set; } 
        public AppUser AppUser { get; set; }
        public Guid RequestId { get; set; }
        public Request Request { get; set; }
        public bool IsRequester { get; set; }
    }
}