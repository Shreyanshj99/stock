using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using StockMarket.models;

namespace StockMarket.Services
{
  public interface IJWTTokenGenerator
  {
    string GenerateToken(IdentityUser user, IList<string> roles);
   
  }
}
