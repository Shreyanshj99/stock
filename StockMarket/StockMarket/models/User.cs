using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace StockMarket.models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        
        public string Username { get; set; }
        
        public string password { get; set; }
        public string usertype { get; set; }
        public string Email { get; set; }
        public double phone { get; set; }
        public bool confirmed { get; set; }
    }
}
