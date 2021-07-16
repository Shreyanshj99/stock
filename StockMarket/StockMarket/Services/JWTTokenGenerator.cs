using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using StockMarket.models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace StockMarket.Services
{
  public class JWTTokenGenerator : IJWTTokenGenerator
  {
    private readonly IConfiguration _config;

    public JWTTokenGenerator(IConfiguration config)
    {
      _config = config;

    }
    public string GenerateToken(IdentityUser user, IList<string> roles)
    {
      var claims = new List<Claim>
      {
        //new Claim(JwtRegisteredClaimNames.Id,user.Id.ToString()),
        new Claim("UserID",user.Id.ToString()),
        
        new Claim(JwtRegisteredClaimNames.GivenName , user.UserName),
        new Claim(JwtRegisteredClaimNames.Email, user.Email)
      };
      foreach (var role in roles)
      {
        claims.Add(new Claim(ClaimTypes.Role, role));
      }

      var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["ApplicationSettings:JWT_Secret"]));
      var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(claims),
        Expires = DateTime.Now.AddDays(7),
        SigningCredentials = creds,
        Issuer = _config["ApplicationSettings:Client_URL"],
        //Audience = _config["Token:Audience"]
      };

      var tokenHandler = new JwtSecurityTokenHandler();

      var token = tokenHandler.CreateToken(tokenDescriptor);

      return tokenHandler.WriteToken(token);

    }
  }
}
