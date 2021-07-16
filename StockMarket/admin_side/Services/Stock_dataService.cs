using admin_side.Models;
using MongoDB.Driver;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace admin_side.Services
{
  public class Stock_dataService
  {
    private readonly MongoDB.Driver.IMongoCollection<Stock_data> _stock;
    public Stock_dataService(IStock_dataDatabaseSettings settings)
    {
      var client = new MongoClient(settings.ConnectionString);
      var database = client.GetDatabase(settings.DatabaseName);

      _stock = database.GetCollection<Stock_data>(settings.Stock_dataCollectionName);

    }
    public List<Stock_data> Get()
    {
      List<Stock_data> employees;
      employees = _stock.Find(emp => true).ToList();
      return employees;
    }

    public Stock_data Get(string id) =>
          _stock.Find<Stock_data>(emp => emp.Id == id).FirstOrDefault();

    public Stock_data[] Create(Stock_data []c)
    {
      _stock.InsertMany(c);
      return c;
    }

  }
}
