﻿using IPZ_ChatRoom.Models.Message;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPZ_ChatRoom.Data.Services
{
    public class MessageService
    {
        public MessageService(AppDbContext context)
        {
            _context = context;
            var result = context.Users.ToList();
            var result2 = context.Messages.Include(x=>x.User).ToList();
            messages = context.Messages;
        }

        private readonly AppDbContext _context;

        public IQueryable<Message> messages { get; set; }
        public async Task<int> addMessageAsync(Message msg)
        {
            msg.User = _context.Users.FirstOrDefault(x=>x.Id == msg.UserId);
            await _context.Messages.AddAsync(msg);
            return await _context.SaveChangesAsync();
        }
    }
}
