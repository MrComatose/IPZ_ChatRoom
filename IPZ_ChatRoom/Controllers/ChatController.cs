using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IPZ_ChatRoom.Data.Services;
using IPZ_ChatRoom.Hubs;
using IPZ_ChatRoom.Models.ChatRoom;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace IPZ_ChatRoom.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly ChatService _chatService;
        private readonly IHubContext<ChatHub> _chatHub;

        public ChatController(ChatService chats, IHubContext<ChatHub> hubContext)
        {
            _chatService = chats;
            _chatHub = hubContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetChats()
        {
            return Ok(await _chatService.Chats.ToListAsync());
        }
        [HttpPost]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
        public async Task<IActionResult> CreateChat([FromQuery]string name)
        {
            var chat = new ChatRoom()
            {
                Name = name,
                Created = DateTime.Now
            };
            chat.Id = await _chatService.addChatRoomAsync(chat);
            await _chatHub.Clients.All.SendAsync("ChatCreated", chat);
            return Ok();
        }
    }
}