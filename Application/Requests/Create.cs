using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Requests
{
    public class Create
    {
        public class Command : IRequest<Unit>
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

        public class Handler : IRequestHandler<Command, Unit>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Requests.Add(request.Request);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}