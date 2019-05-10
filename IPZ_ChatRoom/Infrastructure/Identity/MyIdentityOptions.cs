using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPZ_ChatRoom.Infrastructure.Identity
{
    public class MyIdentityOptions
    {
        public string JwtKey { get; set; }
        public string JwtIssuer { get; set; }
        public int JwtExpireDays { get; set; }
        public Admin Admin { get; set; }

    }
    public class Admin
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public string PictureUrl { get; set; }
    }
}
