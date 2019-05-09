using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPZ_ChatRoom.VIewModels
{
    public class MessageViewModel
    {
        public string UserName { get; set; }
        public string Text { get; set; }
        public DateTime Date { get; set; }
        public string FullName { get; set; }
    }
}
