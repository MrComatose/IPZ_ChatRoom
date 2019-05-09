using IPZ_ChatRoom.Models.Message;
using IPZ_ChatRoom.VIewModels;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace IPZ_ChatRoom.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(Message message)
        {
            var model = new MessageViewModel()
            {
                Date = message.Date,
                UserName = message.User.UserName,
                Text = message.Text,
                FullName = message.User.FullName
            };
            await Clients.All.SendAsync("ReceiveMessage", model);

        }

        //public async Task CheckConnections()
        //{
        //   await Clients.Caller.SendAsync(this.Clients.)
        //    await Clients.All.SendAsync("Connections");

        //}
    }
}
