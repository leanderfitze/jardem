using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Requests
{
    public class List
    {
        public class Query : IRequest<List<Request>>
        {

        }

        public class Handler : IRequestHandler<Query, List<Request>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Request>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Requests.ToListAsync();
            }
        }
    }
}