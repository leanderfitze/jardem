using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Requests
{
    public class Details
    {
        public class Query : IRequest<Result<Request>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<Request>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Request>> Handle(Query request, CancellationToken cancellationToken)
            {
                var req = await _context.Requests.FirstOrDefaultAsync(x=>x.Id==request.Id);
                return Result<Request>.Success(req);
            }
        }
    }
}