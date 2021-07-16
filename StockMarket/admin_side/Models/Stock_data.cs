using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace admin_side.Models
{
  public class Stock_data
  {
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    public string Company_Code { get; set; }
    public string Stock_Exchange { get; set; }
  
   
    public string Date { get; set; }
    public string Time { get; set; }
    public int Current_Price { get; set; }
  }
}
