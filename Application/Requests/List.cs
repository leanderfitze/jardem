using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Requests
{
    public class List
    {
        public class Query : IRequest<Result<List<Request>>>
        {

        }

        public class Handler : IRequestHandler<Query, Result<List<Request>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Request>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Request>>.Success( await _context.Requests.ToListAsync());
            }
        }
    }
}