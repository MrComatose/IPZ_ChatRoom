using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IPZ_ChatRoom.Models.User;
using IPZ_ChatRoom.VIewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace IPZ_ChatRoom.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;

        public UserController(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            return Ok(await _userManager.Users.Select(x => new UserViewModel {
                UserName = x.UserName,
                FullName = x.FullName,
                IsOnline = x.IsOnline,
                PictureUrl = x.PictureUrl
            }).ToListAsync());
        }
    }
}