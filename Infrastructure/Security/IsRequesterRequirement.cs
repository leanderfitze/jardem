using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
    public class IsRequesterRequirement : IAuthorizationRequirement
    {

    }
    public class IsRequesterRequirementHandler : AuthorizationHandler<IsRequesterRequirement>
    {
        private readonly DataContext _dbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public IsRequesterRequirementHandler(DataContext dbContext, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _dbContext = dbContext;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsRequesterRequirement requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null) return Task.CompletedTask;

            var requestId = Guid.Parse(_httpContextAccessor.HttpContext?.Request.RouteValues
                .SingleOrDefault(x => x.Key == "id").Value?.ToString());

            var participant = _dbContext.UserRequests.AsNoTracking()
                .FirstOrDefaultAsync(x => x.AppUserId == userId && x.RequestId == requestId).Result;

            if (participant == null) return Task.CompletedTask;

            if (participant.IsRequester) context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}