using MongoDB.Driver;
using StockMarket.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StockMarket.Services
{
    public class UserService
    {
        private readonly MongoDB.Driver.IMongoCollection<User> _user;
        public UserService(IUserDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _user = database.GetCollection<User>(settings.UserCollectionName);

        }

        public List<User> Get()
        {
            List<User> employees;
            employees = _user.Find(emp => true).ToList();
            return employees;
        }

        public User Get(string id) =>
            _user.Find<User>(emp => emp.Id == id).FirstOrDefault();

        public User Create(User c)
        {
            _user.InsertOne(c);
            return c;
        }

        public void Update(string id, User b) =>
            _user.ReplaceOne(b => b.Id == id, b);



        public void Remove(string id) =>
            _user.DeleteOne(book => book.Id == id);
    }
}
