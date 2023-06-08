using Application.Core;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Requests
{
    public class Details
    {
        public class Query : IRequest<Result<RequestDto>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<RequestDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<RequestDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var req = await _context.Requests.Include(r => r.Users)
                    .ThenInclude(ur => ur.AppUser).FirstOrDefaultAsync(x => x.Id == request.Id);

                var requestsToReturn = new RequestDto
                {
                    Id = req.Id,
                    Title = req.Title,
                    Date = req.Date,
                    Details = req.Details,
                    Resolved = req.Resolved,
                    RequesterUserName = req.Users.FirstOrDefault(x => x.IsRequester)?.AppUser.UserName,
                    Participants = req.Users.Select(ur => new Application.Profiles.Profile
                    {
                        UserName = ur.AppUser.UserName,
                        DisplayName = ur.AppUser.DisplayName,
                        UserType = ur.AppUser.UserType
                    }).ToList()
                };
                return Result<RequestDto>.Success(requestsToReturn);
            }
        }
    }
}