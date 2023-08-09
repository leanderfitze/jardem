using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
    public class Create
    {
        public class Command : IRequest<Result<CommentDTO>>
        {
            public string Body { get; set; }
            public Guid RequestId { get; set; }
        }

        public class CommentValidator : AbstractValidator<Command>
        {
            public CommentValidator()
            {
                RuleFor(x => x.Body).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Result<CommentDTO>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _mapper = mapper;
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<CommentDTO>> Handle(Command request, CancellationToken cancellationToken)
            {
                var req = await _context.Requests.FindAsync(request.RequestId);

                if (req == null) return null;

                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());

                if (user == null) return null;

                var comment = new Comment
                {
                    Body = request.Body,
                    Author = user,
                    Request = req
                };

                req.Comments.Add(comment);

                var result = await _context.SaveChangesAsync() > 0;

                if (result)
                {
                    return Result<CommentDTO>.Success(_mapper.Map<CommentDTO>(comment));
                }

                return Result<CommentDTO>.Failure("Failed to add a comment");
            }
        }
    }
}