using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Requests
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Request Request { get; set; }
        }

        public class CommandValidator:AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x=>x.Request).SetValidator(new RequestValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Requests.Add(request.Request);
                var result = await _context.SaveChangesAsync()>0;
                if(result)
                return Result<Unit>.Success(Unit.Value);
                return Result<Unit>.Failure("Failed to create a Request");
            }
        }
    }
}