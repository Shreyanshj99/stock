using admin_side.Models;
using MongoDB.Driver;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace admin_side.Services
{
    public class exchangeService
    {
        private readonly MongoDB.Driver.IMongoCollection<exchange> _exchange;
        public exchangeService(IexchangeDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _exchange = database.GetCollection<exchange>(settings.exchangeCollectionName);

        }

        public List<exchange> Get()
        {
            List<exchange> employees;
            employees = _exchange.Find(emp => true).ToList();
            return employees;
        }

        public exchange Get(string id) =>
            _exchange.Find<exchange>(emp => emp.Id == id).FirstOrDefault();

        public exchange Create(exchange c)
        {
            _exchange.InsertOne(c);
            return c;
        }

        public void Update(string id, exchange b) =>
            _exchange.ReplaceOne(b => b.Id == id, b);



        public void Remove(string id) =>
            _exchange.DeleteOne(book => book.Id == id);
    }
}
