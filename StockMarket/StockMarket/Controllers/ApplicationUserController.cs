using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using StockMarket.models;
using StockMarket.Services;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace StockMarket.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ApplicationUserController : ControllerBase
  {
    private readonly UserManager<IdentityUser> _userManager;
    private readonly SignInManager<IdentityUser> _signInManager;
    private readonly IJWTTokenGenerator _jwtToken;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly IConfiguration _config;
    private readonly ImailSender _emailSender;
    public ApplicationUserController(
      UserManager<IdentityUser> userManager,
       SignInManager<IdentityUser> signInManager,
        IJWTTokenGenerator jwtToken,
        RoleManager<IdentityRole> roleManager,
        IConfiguration config,
        ImailSender emailSender)
    {
      _jwtToken = jwtToken;
      _roleManager = roleManager;
      _config = config;
      _emailSender = emailSender;
      _signInManager = signInManager;
      _userManager = userManager;

    }
    /*
    [HttpPost]
    [Route("Login")]
    public async Task<IActionResult> Login(LoginModel12 model)
    {

      var userFromDb = await _userManager.FindByNameAsync(model.UserName);

      if (userFromDb == null)
      {
        return BadRequest();
      }

      var result = await _signInManager.CheckPasswordSignInAsync(userFromDb, model.Password, false);


      if (!result.Succeeded)
      {
        return BadRequest();
      }

      var roles = await _userManager.GetRolesAsync(userFromDb);

      IList<Claim> claims = await _userManager.GetClaimsAsync(userFromDb);
      return Ok(new
      {
        result = result,
        username = userFromDb.UserName,
        email = userFromDb.Email,
        token = _jwtToken.GenerateToken(userFromDb, roles, claims)
      });
    }
    */
    
    [HttpPost]
    [Route("Register")]
    public async Task<ActionResult> Register(ApplicationUserModel model)
    {
      model.Role = "user";
      if (!(await _roleManager.RoleExistsAsync(model.Role)))
      {
        await _roleManager.CreateAsync(new IdentityRole(model.Role));
      }
      var userToCreate = new ApplicationUser
      {
        UserName = model.UserName,
        Email = model.Email,
        FullName=model.FullName
        
      };
   

      try
      {
        var result = await _userManager.CreateAsync(userToCreate, model.Password);


        var userFromDb = await _userManager.FindByNameAsync(userToCreate.UserName);
        //Send email to user for confirming email
        var token = await _userManager.GenerateEmailConfirmationTokenAsync(userFromDb);


        var uriBuilder = new UriBuilder(_config["ReturnPaths:ConfirmEmail"]);
        var query = HttpUtility.ParseQueryString(uriBuilder.Query);
        query["token"] = token;
        query["userid"] = userFromDb.Id;
        uriBuilder.Query = query.ToString();
        var urlString = uriBuilder.ToString();

        var senderEmail = _config["ReturnPaths:SenderEmail"];

        await _emailSender.SendEmailAsync(senderEmail, userFromDb.Email, "Confirm your email address", urlString);



        await _userManager.AddToRoleAsync(userToCreate, model.Role);
        return Ok(result);
      }
      catch (Exception)
      {

        throw;
      }
    }
    [HttpPost]
    [Route("Login")]
    public async Task<IActionResult> Login(LoginModel12 model)
    {
      var userFromDb = await _userManager.FindByNameAsync(model.UserName);
      if (userFromDb == null)
      {
        return BadRequest(new
        {
          username="username not defined"
        });
      }
      try
      {
        //!await _userManager.IsEmailConfirmedAsync(model.UserName);
        var result = await _signInManager.CheckPasswordSignInAsync(userFromDb, model.Password, false);
        var roles = await _userManager.GetRolesAsync(userFromDb);


        //var userid = userManager.FindByEmail(context.UserName).Id;
        var w = await _userManager.IsEmailConfirmedAsync(userFromDb);
        if (!result.Succeeded)
        {
          return BadRequest();
        }
        if (!w)
        {
          return BadRequest(new
          {
            email="Email not Verified"
          });
        }
        

        return Ok(new
        {
          result = result,
          username = userFromDb.UserName,
          email = userFromDb.Email,
          Flag = w,
          token = _jwtToken.GenerateToken(userFromDb, roles)
        }); ;
      }
      catch (Exception)
      {

        throw;
      }
      
    }
    [HttpPost("confirmemail")]
    public async Task<IActionResult> ConfirmEmail(ConfirmEmailViewModel model)
    {

      var user = await _userManager.FindByIdAsync(model.UserId);

      try
      {
        var result = await _userManager.ConfirmEmailAsync(user, model.Token);
        return Ok(result);
      }

      catch (Exception)
      {

        throw;
      }
    }
    /*
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _singInManager;
    private readonly ApplicationSettings _appSettings;
   

    public ApplicationUserController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IOptions<ApplicationSettings> appSettings)
    {
      _userManager = userManager;
     _singInManager = signInManager;
      _appSettings = appSettings.Value;
    }
    [HttpPost]
    [Route("Register")]
    //POST : /api/ApplicationUser/Register
    public async Task<Object> PostApplicationUser(ApplicationUserModel model)
    {
      model.Role = "user";
      var applicationUser = new ApplicationUser()
      {
        UserName = model.UserName,
        Email = model.Email,
        FullName = model.FullName
      };

      try
      {
        var result = await _userManager.CreateAsync(applicationUser, model.Password);
        await _userManager.AddToRoleAsync(applicationUser, model.Role);
        return Ok(result);
      }
      catch (Exception)
      {

        throw;
      }
    }

    

    [HttpPost]
    [Route("Login")]
    //POST : /api/ApplicationUser/Login
    public async Task<IActionResult> Login(LoginModel12 model)
    {
      var user = await _userManager.FindByNameAsync(model.UserName);
      //var result = await _signInManager.CheckPasswordSignInAsync( user, model.Password, false);
      if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
      {
        //Get role assigned to the user
        var role = await _userManager.GetRolesAsync(user);
        IdentityOptions _options = new IdentityOptions();

        var tokenDescriptor = new SecurityTokenDescriptor
        {
          Subject = new ClaimsIdentity(new Claim[]
            {
                        new Claim("UserID",user.Id.ToString()),
                        new Claim(_options.ClaimsIdentity.RoleClaimType,role.FirstOrDefault())
            }),
          Expires = DateTime.UtcNow.AddDays(1),
          SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
        };
        var tokenHandler = new JwtSecurityTokenHandler();
        var securityToken = tokenHandler.CreateToken(tokenDescriptor);
        var token = tokenHandler.WriteToken(securityToken);
        return Ok(new { token });
      }
      else
        return BadRequest(new { message = "Username or password is incorrect." });
    }
    */

  }
}
