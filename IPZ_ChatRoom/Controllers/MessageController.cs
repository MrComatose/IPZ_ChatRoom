using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IPZ_ChatRoom.Data.Services;
using IPZ_ChatRoom.Hubs;
using IPZ_ChatRoom.Models.Message;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace IPZ_ChatRoom.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly IHubContext<ChatHub> _hubContext;
        private readonly MessageService _messages;

        public MessageController(IHubContext<ChatHub> hubContext, MessageService mesageService)
        {
            _hubContext = hubContext;
            _messages = mesageService;
        }
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> SendMessage([FromBody]Message msg)
        {
            await this._hubContext.Clients.All.SendAsync("receivemessage", msg);
            await _messages.addMessageAsync(msg);
            return Ok();
        }
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetMessages()
        {

            var result = _messages.messages.OrderBy(x=>x.Date.Ticks).ToList();
            return Ok(result);
        }
    }
}