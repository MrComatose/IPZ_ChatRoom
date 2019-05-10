using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPZ_ChatRoom.VIewModels
{
    public class UserViewModel
    {
        public string UserName { get; set; }
        public string PictureUrl { get; set; }
        public string FullName { get; set; }
        public bool IsOnline { get; set; }

    }
}
