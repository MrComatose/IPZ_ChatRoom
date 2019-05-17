using IPZ_ChatRoom.Infrastructure.Identity;
using IPZ_ChatRoom.Models.ChatRoom;
using IPZ_ChatRoom.Models.Message;
using IPZ_ChatRoom.Models.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPZ_ChatRoom.Data
{
    public class AppDbContext : IdentityDbContext<AppUser>
    {
        public static async Task CreateAdminAccount(
            UserManager<AppUser> appManager,
            RoleManager<IdentityRole> appRoles, 
            Admin admin
            )
        {

            

            var result = await appManager.FindByEmailAsync(admin.Email);
            if (result == null)
            {
                
                if (await appRoles.FindByNameAsync("Admin") == null)
                {
                    await appRoles.CreateAsync(new IdentityRole("Admin"));
                }
               
                var adminUser = new AppUser()
                {
                    Email = admin.Email,
                    FullName = admin.FirstName + " " + admin.LastName,
                    PhoneNumber = admin.PhoneNumber,
                    UserName = admin.UserName,
                    PictureUrl = admin.PictureUrl

                };

                await appManager.CreateAsync(adminUser, admin.Password);
                await appManager.AddToRoleAsync(adminUser, "Admin");
            }

        }
        public DbSet<Message> Messages { get; set; }
        public DbSet<ChatRoom> Chats { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options)
      : base(options)
        {
            this.ChangeTracker.LazyLoadingEnabled = false;
            this.Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //modelBuilder.Entity<AppUser>().HasMany(s => s.Messages).WithOne(s => s.User);
        }
    }
}
