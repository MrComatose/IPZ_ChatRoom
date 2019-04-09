using IPZ_ChatRoom.Infrastructure.Identity;
using IPZ_ChatRoom.Models.User;
using IPZ_ChatRoom.VIewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace IPZ_ChatRoom.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<AppUser> _users;
        private readonly RoleManager<IdentityRole> _roles;
        private readonly MyIdentityOptions _options;
        private readonly SignInManager<AppUser> _signIn;

        public AuthController(UserManager<AppUser> users, RoleManager<IdentityRole> roles,
            MyIdentityOptions options, SignInManager<AppUser> signIn)
        {
            _users = users;
            _roles = roles;
            _options = options;
            _signIn = signIn;
        }
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUser()
        {
            var user =await _users.FindByNameAsync(HttpContext.User.Identity.Name);
            return Ok(user);
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody]SignUpViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.FirstOrDefault().Value.Errors.FirstOrDefault().ErrorMessage);
            }
            var user = new AppUser
            {
                Email = model.Email,
                UserName = model.UserName,
                FullName = model.FullName
            };
            var result =await _users.CreateAsync(user,model.Password);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors.First().Description);
            }
            return Ok(user);
        }
        [HttpGet("signin")]
        public async Task<IActionResult> SignIn([Required]string email, [Required]string password)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.FirstOrDefault().Value.Errors.FirstOrDefault().ErrorMessage);
            }
            var user = await _users.FindByEmailAsync(email);
            if (user == null) return BadRequest("User not found");
            var result = await _signIn.CheckPasswordSignInAsync(user, password,false);
            if (!result.Succeeded)
            {
             return BadRequest("Failed on sign in. Password or email incorect.");
            }

            object token = await GenerateJwtTokenAsync(email, user);
            return Ok(new { token = token, user = user });
        }
        private async Task<object> GenerateJwtTokenAsync(string email, IdentityUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                 new Claim(ClaimTypes.Name, user.UserName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.JwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(Convert.ToDouble(_options.JwtExpireDays));

            var token = new JwtSecurityToken(
                _options.JwtIssuer,
                _options.JwtIssuer,
                claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}