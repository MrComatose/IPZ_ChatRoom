using IPZ_ChatRoom.Data.Services;
using IPZ_ChatRoom.Models.Message;
using IPZ_ChatRoom.VIewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IPZ_ChatRoom.Hubs
{
    [Authorize]
    public class ChatHub : Hub
    {
        private readonly MessageService _messageService;
        private readonly UserManager<Models.User.AppUser> _userManager;
        public ChatHub(UserManager<Models.User.AppUser> userManager, MessageService messageService)
        {
            _messageService = messageService;
            _userManager = userManager;
        }
        public async Task SendMessage(Message message)
        {
            var model = new MessageViewModel()
            {
                Date = message.Date,
                UserName = message.User.UserName,
                Text = message.Text,
                FullName = message.User.FullName,
                ChatRoomId = message.ChatRoomId
            };
            var tasks = new List<Task>();
            tasks.Add(_messageService.addMessageAsync(message));
            tasks.Add(Clients.All.SendAsync("ReceiveMessage", model));
            Task.WaitAll(tasks.ToArray());

        }

        public async Task Connect()
        {
            var user = await _userManager.FindByNameAsync(Context.User.Identity.Name);
            user.IsOnline = true;
            await _userManager.UpdateAsync(user);
            await Clients.All.SendAsync("Connection", new UserViewModel()
            {
                UserName = user.UserName,
                FullName = user.FullName,
                PictureUrl = user.PictureUrl,
                IsOnline = user.IsOnline
            });
        }

        [Authorize]
        public async Task Disconnect()
        {
            var user = await _userManager.FindByNameAsync(Context.User.Identity.Name);
            user.IsOnline = false;
            await _userManager.UpdateAsync(user);
            await Clients.All.SendAsync("Connection", new UserViewModel()
            {
                UserName = user.UserName,
                FullName = user.FullName,
                PictureUrl = user.PictureUrl,
                IsOnline = user.IsOnline
            });
        }
    }
}
