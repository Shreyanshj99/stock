using admin_side.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace admin_side.Services
{
    public class IPOService
    {
        private readonly MongoDB.Driver.IMongoCollection<IPO> _ipo;
        public IPOService(IIPODatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _ipo = database.GetCollection<IPO>(settings.IPOCollectionName);

        }

        public List<IPO> Get()
        {
            List<IPO> employees;
            employees = _ipo.Find(emp => true).ToList();
            return employees;
        }

        public IPO Get(string id) =>
            _ipo.Find<IPO>(emp => emp.Id == id).FirstOrDefault();

        public IPO Create(IPO c)
        {
            _ipo.InsertOne(c);
            return c;
        }

        public void Update(string id, IPO b) =>
            _ipo.ReplaceOne(b => b.Id == id, b);



        public void Remove(string id) =>
            _ipo.DeleteOne(book => book.Id == id);
    }
}
