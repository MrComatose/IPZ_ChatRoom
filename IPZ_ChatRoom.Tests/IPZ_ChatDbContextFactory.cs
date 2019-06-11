using IPZ_ChatRoom.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IPZ_ChatRoom.Tests
{
    public class IPZ_ChatDbContextFactory
    {
        public static AppDbContext Create()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            var context = new AppDbContext(options);


            FillInUsers(context);
            FillInChats(context);
            FillInMessages(context);

            context.SaveChanges();

            return context;
        }
        public static void Destroy(AppDbContext context)
        {
            context.Database.EnsureDeleted();

            context.Dispose();
        }
        private static void FillInUsers(AppDbContext context)
        {
            context.Users.Add(
                new Models.User.AppUser
                {
                    Email = "test@gmail.com",
                    UserName = "Tester",
                    PhoneNumber = "0672696713",
                    FullName = "Tester"
                }
                );
            context.SaveChanges();
        }
        private static void FillInMessages(AppDbContext context)
        {
            var user = context.Users.First(x => x.Email == "test@gmail.com");
            var chat = context.Chats.First(x => x.Name == "Test chat name");
            context.Messages.AddRange(new List<IPZ_ChatRoom.Models.Message.Message> {
                new IPZ_ChatRoom.Models.Message.Message {
                },
                new IPZ_ChatRoom.Models.Message.Message { },
                new IPZ_ChatRoom.Models.Message.Message { },
                new IPZ_ChatRoom.Models.Message.Message { },
            });
            context.SaveChanges();
        }

        private static void FillInChats(AppDbContext context)
        {
            context.Chats.Add( new Models.ChatRoom.ChatRoom {  Created  = DateTime.Now,Name = "Test chat name"});
            context.SaveChanges();
        }
    }
}
