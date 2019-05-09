using IPZ_ChatRoom.Data.Services;
using IPZ_ChatRoom.Models.Message;
using IPZ_ChatRoom.VIewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
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
                FullName = message.User.FullName
            };
            await Clients.All.SendAsync("ReceiveMessage", model);
            _messageService.addMessageAsync(message);
        }

        public async Task Connect()
        {
            var user =await _userManager.FindByNameAsync(Context.User.Identity.Name);
            user.IsOnline = true;
            await Clients.All.SendAsync("Connection", new UserViewModel()
            {
                UserName = user.UserName,
                FullName = user.FullName,
                PictureUrl = user.PictureUrl,
                IsOnline = user.IsOnline
            });
            _userManager.UpdateAsync(user);
        }
        public async Task Disconect()
        {
            var user = await _userManager.FindByNameAsync(Context.User.Identity.Name);
            user.IsOnline = false;
            await Clients.All.SendAsync("Connection", new UserViewModel()
            {
                UserName = user.UserName,
                FullName = user.FullName,
                PictureUrl = user.PictureUrl,
                IsOnline = user.IsOnline
            });
            _userManager.UpdateAsync(user);
        }
    }
}
