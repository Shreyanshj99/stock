using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace admin_side.Models
{
  public class ApplicationSettings
  {
    public string JWT_Secret { get; set; }
    public string Client_URL { get; set; }
  }
}
