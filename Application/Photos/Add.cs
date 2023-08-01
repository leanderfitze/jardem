using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Add
    {
        public class Command : IRequest<Result<Photo>>
        {
            public IFormFile File { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Photo>>
        {
            private readonly IUserAccessor _userAccessor;
            private readonly DataContext _context;
            private readonly IPhotoAccessor _photoAccessor;
            public Handler(IUserAccessor userAccessor, DataContext context, IPhotoAccessor photoAccessor)
            {
                _photoAccessor = photoAccessor;
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                    .Include(u => u.Photos)
                    .FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUserName());

                if (user == null) 
                    return null;

                var photoUploadResult = await _photoAccessor.AddPhoto(request.File);
                var photo = new Photo{
                    Url = photoUploadResult.Url,
                    Id = photoUploadResult.PublicId
                };

                if(user.MainPhoto == null) 
                    user.MainPhoto = photo.Url;

                user.Photos.Add(photo);

                var result= await _context.SaveChangesAsync()>0;
                return result?Result<Photo>.Success(photo): Result<Photo>.Failure("Failed to upload photo");

            }
        }
    }
}