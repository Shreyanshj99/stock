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
    public class SectorController : Controller
    {
        private readonly SectorService _iService;

        public SectorController(SectorService ex)
        {
            _iService = ex;
        }
        [HttpGet]
        public ActionResult<List<Sector>> Get()
        {
            var emp = _iService.Get();
            return emp;
        }

        [HttpGet("{id:length(24)}", Name = "GetSector")]
        public ActionResult<Sector> Get(string id)
        {
            var book1 = _iService.Get(id);

            if (book1 == null)
            {
                return NotFound();
            }

            return book1;
        }
        [HttpPost]
        public ActionResult<Sector> Create(Sector book)
        {
            _iService.Create(book);

            return CreatedAtRoute("GetSector", new { id = book.Id.ToString() }, book);
        }
        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Sector bookIn)
        {
            var book = _iService.Get(id);

            if (book == null)
            {
                return NotFound();
            }
            if (bookIn.Id == null)
                bookIn.Id = id;

            _iService.Update(id, bookIn);

            return NoContent();
        }
        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var book = _iService.Get(id);

            if (book == null)
            {
                return NotFound();
            }

            _iService.Remove(book.Id);

            return NoContent();
        }
    }
}
