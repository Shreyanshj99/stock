using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace admin_side.Models
{
    public class Company
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [DisplayName("Company name")]
        public string company_name { get; set; }
        public string company_code { get; set; }
        public int Turnover { get; set; }

        public string CEO { get; set; }
        [DisplayName("Board of Directors")]
        public string Board_directors { get; set; }
        [DisplayName("Stock Exchnage")]
        public string stock_exchange { get; set; }

        public string Sector { get; set; }

        public string Brief { get; set; }
        [DisplayName("Stock Code")]
        public int stock_code { get; set; }
    }
}
