using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace admin_side.Models
{
    public class IPODatabaseSettings:IIPODatabaseSettings
    {
        public string IPOCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
    public interface IIPODatabaseSettings
    {
        public string IPOCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
}
