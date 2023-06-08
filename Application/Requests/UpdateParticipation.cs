using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Requests
{
    public class UpdateParticipation
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid RequestId { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly IUserAccessor _userAccessor;
            private readonly DataContext _context;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());

                if (user == null) return null;

                var req = await _context.Requests
                    .Include(r => r.Users)
                    .ThenInclude(u => u.AppUser)
                    .FirstOrDefaultAsync(x => x.Id == request.RequestId);

                if (req == null) return null;

                var requester = req.Users.FirstOrDefault(x => x.IsRequester)?.AppUser?.UserName;

                var participant = req.Users.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

                if (participant != null && requester == user.UserName) //when user is a requester and is participant toggle resolution
                    req.Resolved = !req.Resolved;

                if(participant !=null &&requester != user.UserName )
                    req.Users.Remove(participant);

                if(participant==null&&user.UserType!=UserType.Volunteer) return Result<Unit>.Failure("Failed to participate, you are not a volunteer");

                if(participant == null){
                    participant = new UserRequest
                    {
                        AppUser = user,
                        Request = req,
                        IsRequester = false
                    };
                    req.Users.Add(participant);
                }

                var result = await _context.SaveChangesAsync()>0;
                return result? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Failed to update praticipation");
            }
        }
    }
}