using IPZ_ChatRoom.Models.Message;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace IPZ_ChatRoom.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(Message message)
        {
            
                await Clients.All.SendAsync("ReceiveMessage", message);
            
        }
    }
}
