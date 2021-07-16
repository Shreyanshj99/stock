using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace admin_side.Models
{
    public class exchangeDatabaseSettings: IexchangeDatabaseSettings
    {
        public string exchangeCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
    public interface IexchangeDatabaseSettings
    {
        public string exchangeCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
}

