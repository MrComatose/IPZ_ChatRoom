using IPZ_ChatRoom.Models.ChatRoom;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPZ_ChatRoom.Data.Services
{
    public class ChatService
    {
        public ChatService(AppDbContext context)
        {
            _context = context;
            Chats = context.Chats;
        }

        private readonly AppDbContext _context;

        public IQueryable<ChatRoom> Chats { get; set; }
        public async Task<int> addChatRoomAsync(ChatRoom chat)
        {
            await _context.Chats.AddAsync(chat);
            return await _context.SaveChangesAsync();
        }
    }
}
