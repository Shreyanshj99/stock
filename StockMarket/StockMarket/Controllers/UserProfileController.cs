using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StockMarket.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StockMarket.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class UserProfileController : Controller
  {
    private UserManager<IdentityUser> _userManager;
    public UserProfileController(UserManager<IdentityUser> userManager)
    {
      _userManager = userManager;
    }

    
    [HttpGet]
    [Authorize]
    //GET : /api/UserProfile
    public async Task<Object> GetUserProfile()
    {
      string userId = User.Claims.First(c => c.Type == "UserID").Value;
      var user = await _userManager.FindByIdAsync(userId);
      return new
      {
       
        user.Email,
        user.UserName,
      
        user.PasswordHash
      };
    }
    
    [HttpPost]
    [Authorize]
    public async Task<ActionResult> ChangePassword(ChangePassword c)
    {
      string userId = User.Claims.First(c => c.Type == "UserID").Value;
      var user = await _userManager.FindByIdAsync(userId);
      try
      {
        var result= await _userManager.ChangePasswordAsync(user, c.Current_Password, c.New_Password);
        if (!result.Succeeded)
          return BadRequest();
        return Ok();
      }
      catch (Exception)
      {

        throw;
      }
    }
    
    /*
    [Authorize]
    [HttpGet]
    public ActionResult<IEnumerable<string>> Get()
    {
      return new string[] { "value1", "value2" };
    }
    */

    [HttpGet]
    [Authorize(Roles = "admin")]
    [Route("ForAdmin")]
    public string GetForAdmin()
    {
      return "Web method for Admin";
    }

    [HttpGet]
    [Authorize(Roles = "user")]
    [Route("ForUser")]
    public string GetCustomer()
    {
      return "Web method for User";
    }

    [HttpGet]
    [Authorize(Roles = "admin,user")]
    [Route("ForAdminUser")]
    public string GetForAdminOrCustomer()
    {
      return "Web method for Admin or User";
    }

  }
}
