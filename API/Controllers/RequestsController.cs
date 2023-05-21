using Application.Requests;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class RequestsController : BaseApiController
    {
        [HttpGet] // api/requests
        public async Task<ActionResult<List<Request>>> GetRequests()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Request>> GetRequest(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<IActionResult> CreateRequest(Request request)
        {
            return Ok(await Mediator.Send(new Create.Command { Request = request }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditRequest(Guid id, Request request)
        {
            request.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Request=request})); 
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRequest(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id=id}));
        }
    }
}