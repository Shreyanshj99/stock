using admin_side.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace admin_side.Services
{
    public class SectorService
    {
        private readonly MongoDB.Driver.IMongoCollection<Sector> _company;
        public SectorService(ISectorDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _company = database.GetCollection<Sector>(settings.SectorCollectionName);

        }
        public List<Sector> Get()
        {
            List<Sector> employees;
            employees = _company.Find(emp => true).ToList();
            return employees;
        }

        public Sector Get(string id) =>
            _company.Find<Sector>(emp => emp.Id == id).FirstOrDefault();

        public Sector Create(Sector c)
        {
            _company.InsertOne(c);
            return c;
        }

        public void Update(string id, Sector b) =>
            _company.ReplaceOne(b => b.Id == id, b);



        public void Remove(string id) =>
            _company.DeleteOne(book => book.Id == id);
    }
}
