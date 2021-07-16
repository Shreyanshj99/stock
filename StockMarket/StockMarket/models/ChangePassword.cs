using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StockMarket.models
{
  public class ChangePassword
  {
    public string Current_Password { get; set; }
    public string New_Password { get; set; }
    public string Confirm_Password { get; set; }
  }
}
