using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using IPZ_ChatRoom.Models.User;
namespace IPZ_ChatRoom.Models.Message
{
    public class Message
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string UserId { get; set; }
        public AppUser User { get; set; }
        public string ImageUrl { get; set; }
        public DateTime Date { get; set; }
    }
    
}
