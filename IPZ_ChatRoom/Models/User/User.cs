using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace IPZ_ChatRoom.Models.User
{
    public class AppUser : IdentityUser 
    {
        // Extended Properties
        public string FullName { get; set; }
        public string PictureUrl { get; set; }
        [NotMapped]
        public virtual List<IPZ_ChatRoom.Models.Message.Message> Messages { get; set; }
    }
}
