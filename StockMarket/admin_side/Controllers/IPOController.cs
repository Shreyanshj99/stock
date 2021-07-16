using admin_side.Models;
using admin_side.Services;
using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace admin_side.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IPOController : Controller
    {
        private readonly IPOService _ipoService;

        public IPOController(IPOService ex)
        {
            _ipoService = ex;
        }
        [HttpGet]
        public ActionResult<List<IPO>> Get()
        {
            var emp = _ipoService.Get();
            return emp;
        }

        [HttpGet("{id:length(24)}", Name = "GetIPO")]
        public ActionResult<IPO> Get(string id)
        {
            var book1 = _ipoService.Get(id);

            if (book1 == null)
            {
                return NotFound();
            }

            return book1;
        }
        [HttpPost]
        public ActionResult<IPO> Create(IPO book)
        {
            _ipoService.Create(book);

            return CreatedAtRoute("GetIPO", new { id = book.Id.ToString() }, book);
        }
        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, IPO bookIn)
        {
            var book = _ipoService.Get(id);

            if (book == null)
            {
                return NotFound();
            }
            if (bookIn.Id == null)
                bookIn.Id = id;

            _ipoService.Update(id, bookIn);

            return NoContent();
        }
        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var book = _ipoService.Get(id);

            if (book == null)
            {
                return NotFound();
            }

            _ipoService.Remove(book.Id);

            return NoContent();
        }
    }
}
