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
    public class CompanyController : Controller
    {

        private readonly CompanyService _companyService;

        public CompanyController(CompanyService companyService)
        {
            _companyService = companyService;
        }



        [HttpGet]
        public ActionResult<List<Company>> Get()
        {
            var emp = _companyService.Get();
            return emp;
        }

        [HttpGet("{id:length(24)}", Name = "GetCompany")]
        public ActionResult<Company> Get(string id)
        {
            var book = _companyService.Get(id);

            if (book == null)
            {
                return NotFound();
            }

            return book;
        }
        [HttpPost]
        public ActionResult<Company> Create(Company book)
        {
            _companyService.Create(book);

            return CreatedAtRoute("GetCompany", new { id = book.Id.ToString() }, book);
        }
        /*
        [Route("create")]
        [HttpGet]
        public ActionResult Create()
        {
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(Company e)
        {
            if (ModelState.IsValid)
            {
                _companyService.Create(e);
                return RedirectToAction(nameof(Index));
            }
            return View(e);
        }
        */
        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Company bookIn)
        {
            var book = _companyService.Get(id);

            if (book == null)
            {
                return NotFound();
            }
            if (bookIn.Id == null)
                bookIn.Id = id;

            _companyService.Update(id, bookIn);

            return NoContent();
        }
        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var book = _companyService.Get(id);

            if (book == null)
            {
                return NotFound();
            }

            _companyService.Remove(book.Id);

            return NoContent();
        }
        /*
        public ActionResult Edit(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var car = _companyService.Get(id);
            if (car == null)
            {
                return NotFound();
            }
            return View(car);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(string id, Company car)
        {
            if (id != car.Id)
            {
                return NotFound();
            }
            if (ModelState.IsValid)
            {
                _companyService.Update(id, car);
                return RedirectToAction(nameof(Index));
            }
            else
            {
                return View(car);
            }
        }
        public ActionResult Delete(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var car = _companyService.Get(id);
            if (car == null)
            {
                return NotFound();
            }
            return View(car);
        }
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(string id)
        {
            try
            {
                var car = _companyService.Get(id);

                if (car == null)
                {
                    return NotFound();
                }

                _companyService.Remove(car.Id);

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
        */
    }
}
