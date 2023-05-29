using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using FluentValidation;

namespace Application.Requests
{
    public class RequestValidator:AbstractValidator<Request>
    {
        public RequestValidator()
        {
            RuleFor(x=>x.Title).NotEmpty();
            RuleFor(x=>x.Details).NotEmpty();
            RuleFor(x=>x.Date).NotEmpty();
        }
    }
}