using Microsoft.AspNetCore.Mvc;
using admin_side.Models;
using admin_side.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace admin_side.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class exchangeController : Controller
    {
        private readonly exchangeService _exchangeService;

        public exchangeController(exchangeService ex)
        {
            _exchangeService = ex;
        }
        [HttpGet]
        public ActionResult<List<exchange>> Get()
        {
            var emp = _exchangeService.Get();
            return emp;
        }

        [HttpGet("{id:length(24)}", Name = "GetExchange")]
        public ActionResult<exchange> Get(string id)
        {
            var book1 = _exchangeService.Get(id);

            if (book1 == null)
            {
                return NotFound();
            }

            return book1;
        }
        [HttpPost]
        public ActionResult<exchange> Create(exchange book)
        {
            _exchangeService.Create(book);

            return CreatedAtRoute("GetExchange", new { id = book.Id.ToString() }, book);
        }
        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, exchange bookIn)
        {
            var book = _exchangeService.Get(id);

            if (book == null)
            {
                return NotFound();
            }
            if (bookIn.Id == null)
                bookIn.Id = id;

            _exchangeService.Update(id, bookIn);

            return NoContent();
        }
        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var book = _exchangeService.Get(id);

            if (book == null)
            {
                return NotFound();
            }

            _exchangeService.Remove(book.Id);

            return NoContent();
        }
    }
}
