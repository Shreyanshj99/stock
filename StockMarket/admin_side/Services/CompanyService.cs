using admin_side.Models;
using MongoDB.Driver;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace admin_side.Services
{
    public class CompanyService
    {
        private readonly MongoDB.Driver.IMongoCollection<Company> _company;
        public CompanyService(ICompanyDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _company = database.GetCollection<Company>(settings.CompanyCollectionName);

        }

        public List<Company> Get()
        {
            List<Company> employees;
            employees = _company.Find(emp => true).ToList();
            return employees;
        }

        public Company Get(string id) =>
            _company.Find<Company>(emp => emp.Id == id).FirstOrDefault();

        public Company Create(Company c)
        {
            _company.InsertOne(c);
            return c;
        }

        public void Update(string id, Company b) =>
            _company.ReplaceOne(b => b.Id == id, b);



        public void Remove(string id) =>
            _company.DeleteOne(book => book.Id == id);
    }
}
