using IPZ_ChatRoom.Data;
using IPZ_ChatRoom.Data.Services;
using System;
using System.Linq;
using System.Threading.Tasks;
using TechTalk.SpecFlow;
using Xunit;

namespace IPZ_ChatRoom.Tests
{
    [Binding]
    public class AddingMessageSteps : TestBase
    {
        private AppDbContext context;
        private MessageService service;
        private IPZ_ChatRoom.Models.Message.Message message;
        [Given(@"I create new database context\.")]
        public void GivenICreateNewDatabaseContext_()
        {
            context = GetNewInMemoryDbContext();
        }

        [Given(@"I successfuly create message srvice\.")]
        public void GivenISuccessfulyCreateMessageSrvice_()
        {
            service = new MessageService(context);
        }

        [When(@"I adding new message for user with email ""([^""]*)""\.")]
        public async Task WhenIAddingNewMessageForUserWithEmail_(string p0)
        {
            var user = context.Users.First(x => x.Email == p0);
            var chat = context.Chats.First(x => x.Name == "Test chat name");
            message = new IPZ_ChatRoom.Models.Message.Message
            {
                ChatRoom = chat,
                User = user,
                Date = DateTime.Now,
                Text = "Test"
            };
            await service.addMessageAsync(message);
        }

        [Then(@"Message Successfuly added\.")]
        public void ThenMessageSuccessfulyAdded_()
        {
            Assert.Contains(message, service.messages);
        }
    }
}
