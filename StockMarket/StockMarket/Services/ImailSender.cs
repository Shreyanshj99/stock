using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StockMarket.Services
{
  public interface ImailSender
  {
    Task SendEmailAsync(string fromAddress, string toAddress, string subject, string message);
  }
}
