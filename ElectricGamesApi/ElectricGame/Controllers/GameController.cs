using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantApp.Contexts;
using RestaurantApp.Models;

namespace RestaurantApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        public IConfiguration _configuration;
        private DatabaseContext _context;
        private readonly IHostEnvironment webHostEnvironment;
        public GameController(IConfiguration configuration, DatabaseContext context, IHostEnvironment hostEnvironment)
        {
            _configuration = configuration;
            _context = context;
            webHostEnvironment=hostEnvironment;
        }
        [HttpPost]
        [Route("AddGame")]
        public async Task<IActionResult> AddGame([FromForm]Game game)
        {


            try
            {
                var filepath= UploadedFile(game.ProfileImage);
                game.ImagePath = filepath;
                _context.Games.Add(game);
                var result = _context.SaveChanges();
                if (result > 0)
                {
                    return Ok(new { status = "ok", message = "Successfully Game Added" });
                }

                return BadRequest(new { status = "error", message = "Something wrong" });
            }
            catch (Exception ex)
            {
                return BadRequest();

            }
        }
        [HttpPut]
        [Route("UpdateGame")]
        public async Task<IActionResult> UpdateGame([FromForm] Game game)
        {

            try
            {
               
                    //game.ImagePath = g.ImagePath;
                    _context.Games.Update(game);
                    var result = _context.SaveChanges();
                    if (result > 0)
                    {
                        return Ok(new { status = "ok", message = "Successfully Game Updated" });
                    }
                
                return BadRequest(new { status = "error", message = "Something wrong" });
            }
            catch (Exception ex)
            {
                return BadRequest();

            }
        }
        [HttpGet]
        [Route("GetAllGames")]
        public async Task<IActionResult> GetAllGames()
        {
            try
            {
                var products = await _context.Games.ToListAsync();
                if (products == null)
                {
                    return NotFound();
                }
                return Ok(products);
            }
            catch (Exception ex)
            {
                return BadRequest();

            }

        }
        [HttpGet]
        [Route("GetGameById/{Id}")]
        public async Task<IActionResult> GetGameById(int Id)
        {
            try
            {
                var game = await _context.Games.Where(x => x.GameId == Id).FirstOrDefaultAsync();
                if (game == null)
                {
                    return NotFound();
                }
                return Ok(game);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Route("GetGameByName/{Name}")]
        public async Task<IActionResult> GetGameByName(string Name)
        {
            try
            {
                var games = _context.Games.Where(x => x.Name.ToLower().Contains(Name.ToLower())).ToList();
                if (games == null)
                {
                    return NotFound();
                }
                return Ok(games);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpDelete]
        [Route("DeleteGame/{Id}")]
        public async Task<IActionResult> DeleteGame(int Id)
        {
            try
            {
                var game = await _context.Games.Where(x => x.GameId == Id).FirstOrDefaultAsync();
                if (game != null)
                {
                    _context.Games.Remove(game);
                    var result = await _context.SaveChangesAsync();
                    return Ok(result);
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
        private string UploadedFile(IFormFile image)
        {
            string uniqueFileName = null;

            if (image != null)
            {
                string uploadsFolder = Path.Combine(webHostEnvironment.ContentRootPath, "wwwroot/images");
                uniqueFileName = Guid.NewGuid().ToString() + "_" + image.FileName;
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    image.CopyTo(fileStream);
                }
            }
            return uniqueFileName;
        }

    }
}
