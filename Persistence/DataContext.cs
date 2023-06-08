using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Request> Requests { get; set; }
        public DbSet<UserRequest> UserRequests { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserRequest>(x=>x.HasKey(ur=>new {ur.RequestId, ur.AppUserId}));
                
            
            builder.Entity<UserRequest>()
                .HasOne(u=>u.AppUser)
                .WithMany(r=>r.Requests)
                .HasForeignKey(ur=>ur.AppUserId);

            builder.Entity<UserRequest>()
                .HasOne(r=>r.Request)
                .WithMany(u=>u.Users)
                .HasForeignKey(ur=>ur.RequestId);
        }
    }
}