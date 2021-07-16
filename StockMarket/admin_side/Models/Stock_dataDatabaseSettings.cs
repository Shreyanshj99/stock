using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace admin_side.Models
{
  public class Stock_dataDatabaseSettings: IStock_dataDatabaseSettings
  {
    public string Stock_dataCollectionName { get; set; }
    public string ConnectionString { get; set; }
    public string DatabaseName { get; set; }
  }
  public interface IStock_dataDatabaseSettings
  {
    public string Stock_dataCollectionName { get; set; }
    public string ConnectionString { get; set; }
    public string DatabaseName { get; set; }
  }
}

