using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Requests
{
    public class List
    {
        public class Query : IRequest<Result<List<RequestDto>>>
        {

        }

        public class Handler : IRequestHandler<Query, Result<List<RequestDto>>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<List<RequestDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());

                var requests = await _context.Requests
                    .Include(r => r.Users)
                    .ThenInclude(ur => ur.AppUser)
                    .ToListAsync(cancellationToken);

                var requestsToReturn = requests.Select(r => new RequestDto
                {
                    Id = r.Id,
                    Title = r.Title,
                    Date = r.Date,
                    Details = r.Details,
                    RequesterUserName = r.Users.FirstOrDefault(x => x.IsRequester)?.AppUser.UserName,
                    Participants = r.Users.Select(ur => new ParticipantDto
                    {
                        UserName = ur.AppUser?.UserName,
                        DisplayName = ur.AppUser?.DisplayName,
                        UserType = (Domain.UserType)(ur.AppUser?.UserType),
                        Image = ur.AppUser?.MainPhoto
                    }).ToList()
                }).ToList();

                if (user.UserType == Domain.UserType.Requester)
                    requestsToReturn = requestsToReturn.Where(x => x.RequesterUserName == user.UserName).ToList();
                return Result<List<RequestDto>>.Success(requestsToReturn);
            }
        }
    }
}