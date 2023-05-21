using Application.Requests;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class RequestsController : BaseApiController
    {
        [HttpGet] // api/requests
        public async Task<ActionResult<List<Request>>> GetRequests(CancellationToken ct)
        {
            return await Mediator.Send(new List.Query(), ct);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Request>> GetRequest(Guid id, CancellationToken ct)
        {
            return await Mediator.Send(new Details.Query { Id = id }, ct);
        }

        [HttpPost]
        public async Task<IActionResult> CreateRequest(Request request,CancellationToken ct)
        {
            return Ok(await Mediator.Send(new Create.Command { Request = request }, ct));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditRequest(Guid id, Request request,CancellationToken ct)
        {
            request.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Request=request},ct)); 
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRequest(Guid id,CancellationToken ct)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id=id}, ct));
        }
    }
}