using IPZ_ChatRoom.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace IPZ_ChatRoom.Tests
{
    public class TestBase
    {
        public AppDbContext GetNewInMemoryDbContext() => IPZ_ChatDbContextFactory.Create();
    }
}
