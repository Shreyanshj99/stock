using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace admin_side.Models
{
    public class IPO
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [DisplayName("Company name")]
        public string company_name { get; set; }
        [DisplayName("Stock Exchnage")]
        public string stock_exchange { get; set; }
        public int price_per_share { get; set; }
        public int total_shares { get; set; }
        public string Date { get; set; }
        public string remarks { get; set; }
    }
}
