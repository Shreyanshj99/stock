using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace StockMarket.models
{
  public class ConfirmEmailViewModel
  {
    [Required]
    public string Token { get; set; }
    [Required]
    public string UserId { get; set; }
  }
}
