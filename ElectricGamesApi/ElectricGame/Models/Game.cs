using RestaurantApp.Interfaces;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RestaurantApp.Models
{
    public class Game: IGame
    {
        [Key]
        public int GameId { get; set; }
        public string Name { get; set; }
        public string Platform { get; set; }
        public string ReleaseYear { get; set; }
        public string? ImagePath { get; set; }
        [NotMapped] 
        public IFormFile? ProfileImage { get; set; }
        public ICollection<GameCharacter>? GameCharacters { get; set; }

    }
}
