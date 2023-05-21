using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class RequestsController: BaseApiController
    {
        private readonly DataContext _context;
        public RequestsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet] // api/requests
        public async Task<ActionResult<List<Request>>> GetRequests(){
            return await _context.Requests.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Request>> GetRequest(Guid id){
            return await _context.Requests.FindAsync(id);
        }
    }
}