using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class SetMain
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
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
                    .Include(u=>u.Photos)
                    .FirstOrDefaultAsync(u=>u.UserName==_userAccessor.GetUserName());

                if(user==null) return null;

                var photo = await _context.Photos.FirstOrDefaultAsync(p=>p.Id == request.Id);

                if(photo == null) return null;

                if(!user.Photos.Any(p=>p.Id==request.Id)) return Result<Unit>.Failure("It is not you photo!");

                user.MainPhoto = photo.Url;

                var result = await _context.SaveChangesAsync()>0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Failed to set the main photo");
            }
        }
    }
}