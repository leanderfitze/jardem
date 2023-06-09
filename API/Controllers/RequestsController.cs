using Application.Requests;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class RequestsController : BaseApiController
    {
        [HttpGet] // api/requests
        public async Task<ActionResult<List<Request>>> GetRequests(CancellationToken ct)
        {
            return HandleResult(await Mediator.Send(new List.Query(), ct));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetRequest(Guid id, CancellationToken ct)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }, ct));
        }

        [HttpPost]
        public async Task<ActionResult> CreateRequest(Request request, CancellationToken ct)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Request = request }, ct));
        }

        [HttpPost("{id}/participate")]
        public async Task<ActionResult> UpdateParticipant(Guid id)
        {
            return HandleResult(await Mediator.Send(new UpdateParticipation.Command { RequestId = id }));
        }

        [Authorize(Policy = "IsRequesterRequirement")]
        [HttpPut("{id}")]
        public async Task<ActionResult> EditRequest(Guid id, Request request, CancellationToken ct)
        {
            request.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Request = request }, ct));
        }

        [Authorize(Policy = "IsRequesterRequirement")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteRequest(Guid id, CancellationToken ct)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }, ct));
        }
    }
}