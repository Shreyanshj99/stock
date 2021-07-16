using Microsoft.AspNetCore.Mvc;
using StockMarket.models;
using StockMarket.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StockMarket.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly UserService _userService;

        public UserController(UserService ex)
        {
            _userService = ex;
        }
        [HttpGet]
        public ActionResult<List<User>> Get()
        {
            var emp = _userService.Get();
            return emp;
        }

        [HttpGet("{id:length(24)}", Name = "GetUser")]
        public ActionResult<User> Get(string id)
        {
            var book1 = _userService.Get(id);

            if (book1 == null)
            {
                return NotFound();
            }

            return book1;
        }
        [HttpPost]
        public ActionResult<User> Create(User book)
        {
            _userService.Create(book);

            return CreatedAtRoute("GetUser", new { id = book.Id.ToString() }, book);
        }
        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, User bookIn)
        {
            var book = _userService.Get(id);

            if (book == null)
            {
                return NotFound();
            }
            if (bookIn.Id == null)
                bookIn.Id = id;

            _userService.Update(id, bookIn);

            return NoContent();
        }
        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var book = _userService.Get(id);

            if (book == null)
            {
                return NotFound();
            }

            _userService.Remove(book.Id);

            return NoContent();
        }
    }
}
