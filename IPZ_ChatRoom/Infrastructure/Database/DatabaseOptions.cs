using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPZ_ChatRoom.Infrastructure.Database
{
    public class DatabaseOptions
    {
        public bool IsSqlLite { get; set; }
        public string Name { get; set; }
        public string DefaultConnection { get; set; }
    }
}
