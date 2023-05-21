using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Requests
{
    public class Delete
    {
        public class Command : IRequest<Unit>
        {
            public Guid Id { get; set; }
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
                var dbrequest = await _context.Requests.FindAsync(request.Id);
                _context.Requests.Remove(dbrequest);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}