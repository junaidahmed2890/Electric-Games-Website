using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantApp.Contexts;
using RestaurantApp.Models;

namespace RestaurantApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CharacterController : ControllerBase
    {
        public IConfiguration _configuration;
        private DatabaseContext _context;
        private readonly IHostEnvironment webHostEnvironment;
        public CharacterController(IConfiguration configuration, DatabaseContext context, IHostEnvironment hostEnvironment)
        {
            _configuration = configuration;
            _context = context;
            webHostEnvironment = hostEnvironment;
        }
        [HttpPost]
        [Route("AddGameCharacter")]
        public async Task<IActionResult> AddGameCharacter([FromForm] GameCharacter gameCharacter)
        {


            try
            {
                var filepath = UploadedFile(gameCharacter.CharacterImage);
                gameCharacter.ImagePath = filepath;
                _context.GameCharacters.Add(gameCharacter);
                var result = _context.SaveChanges();
                if (result > 0)
                {
                    return Ok(new { status = "ok", message = "Successfully Game Character Added" });
                }

                return BadRequest(new { status = "error", message = "Something wrong" });
            }
            catch (Exception ex)
            {
                return BadRequest();

            }
        }
        [HttpPut]
        [Route("UpdateGameCharacter")]
        public async Task<IActionResult> UpdateGameCharacter([FromForm] GameCharacter gameCharacter)
        {

            try
            {

                //game.ImagePath = g.ImagePath;
                _context.GameCharacters.Update(gameCharacter);
                var result = _context.SaveChanges();
                if (result > 0)
                {
                    return Ok(new { status = "ok", message = "Successfully Game Character Updated" });
                }

                return BadRequest(new { status = "error", message = "Something wrong" });
            }
            catch (Exception ex)
            {
                return BadRequest();

            }
        }
        [HttpGet]
        [Route("GetAllGameCharacters")]
        public async Task<IActionResult> GetAllGameCharacters()
        {
            try
            {
                var products = await _context.GameCharacters.ToListAsync();
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
        [Route("GetGameCharactersById/{Id}")]
        public async Task<IActionResult> GetGameCharactersById(int Id)
        {
            try
            {
                var game = await _context.GameCharacters.Where(x => x.GameCharacterId == Id).FirstOrDefaultAsync();
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
        [Route("GetGameCharactersByName/{Name}")]
        public async Task<IActionResult> GetGameCharactersByName(string Name)
        {
            try
            {
                var games = _context.GameCharacters.Where(x => x.Name.ToLower().Contains(Name.ToLower())).ToList();
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
        [Route("DeleteGameCharacters/{Id}")]
        public async Task<IActionResult> DeleteGameCharacters(int Id)
        {
            try
            {
                var game = await _context.GameCharacters.Where(x => x.GameCharacterId == Id).FirstOrDefaultAsync();
                if (game != null)
                {
                    _context.GameCharacters.Remove(game);
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
