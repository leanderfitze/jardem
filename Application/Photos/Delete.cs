using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IPhotoAccessor _photoAccessor;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor, IPhotoAccessor photoAccessor)
            {
                _userAccessor = userAccessor;
                _photoAccessor = photoAccessor;
                _context = context;

            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                    .Include(u => u.Photos)
                    .FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUserName());

                if (user == null) return null;

                var photo = await _context.Photos.FirstOrDefaultAsync(p => p.Id == request.Id);

                if (photo == null) return null;

                if(!user.Photos.Any(p=>p.Id == request.Id)) return Result<Unit>.Failure("It is not you photo!");

                if (photo.Url == user.MainPhoto) return Result<Unit>.Failure("You cannot delete your main photo!");

                var result = await _photoAccessor.DeletePhoto(request.Id);

                if(result == null) return Result<Unit>.Failure("Problem deleting from Cloudinary");
                
                _context.Photos.Remove(photo);
                user.Photos.Remove(photo);

                var success = await _context.SaveChangesAsync()>0;

                return success ? Result<Unit>.Success(Unit.Value): Result<Unit>.Failure("Problem deleting from API");
            }
        }
    }
}