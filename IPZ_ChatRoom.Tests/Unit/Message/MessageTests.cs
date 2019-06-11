using IPZ_ChatRoom.Data.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace IPZ_ChatRoom.Tests.Message
{
    public class MessageTests : TestBase
    {
        public MessageTests()
        {
        }

        [Fact]
        public async Task Create_New_Message_Test()
        {
            // Arrange
            var context = GetNewInMemoryDbContext();
            var service = new MessageService(context);
            var user = context.Users.First(x => x.Email == "test@gmail.com");
            var chat = context.Chats.First(x => x.Name == "Test chat name");
            var message = new IPZ_ChatRoom.Models.Message.Message
            {
                ChatRoom = chat,
                User = user,
                Date = DateTime.Now,
                Text = "Test"
            };
            // Act
            await service.addMessageAsync(message);

            // Assert
            Assert.Contains(message,service.messages);
        }
    }
}
