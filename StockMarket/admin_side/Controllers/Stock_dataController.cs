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
  public class Stock_dataController : Controller
  {
    private readonly Stock_dataService _StockService;

    public Stock_dataController(Stock_dataService StockService)
    {
      _StockService = StockService;
    }

    [HttpGet]
    public ActionResult<List<Stock_data>> Get()
    {
      var emp = _StockService.Get();
      return emp;
    }

    [HttpGet("{id:length(24)}", Name = "GetStock")]
    public ActionResult<Stock_data> Get(string id)
    {
      var book = _StockService.Get(id);

      if (book == null)
      {
        return NotFound();
      }

      return book;
    }



    [HttpPost]
    public ActionResult<Stock_data> Create(Stock_data []book)
    {
      _StockService.Create(book);
      return Ok();
      //return CreatedAtRoute("GetStock", new { id = book.Id.ToString() }, book);
    }

  }
}
