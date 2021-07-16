using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace admin_side.Models
{
    public class exchange
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [DisplayName("Stock Exchnage")]
        public string stock_exchange { get; set; }
        public string Brief { get; set; }
        [DisplayName("Contact Address")]
        public string contact { get; set; }
        public string remarks { get; set; }

    }
}
