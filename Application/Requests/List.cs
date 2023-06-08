using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
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
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<RequestDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
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
                    Participants = r.Users.Select(ur => new Application.Profiles.Profile
                    {
                        UserName = ur.AppUser.UserName,
                        DisplayName = ur.AppUser.DisplayName,
                        UserType = ur.AppUser.UserType
                    }).ToList()
                }).ToList();

                return Result<List<RequestDto>>.Success(requestsToReturn);
            }
        }
    }
}