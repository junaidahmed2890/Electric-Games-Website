using RestaurantApp.Interfaces;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RestaurantApp.Models
{
    public class GameCharacter: IGameCharacter
    {
        [Key]
        public int GameCharacterId { get; set; }
        public string Name { get; set; }
        public string? ImagePath { get; set; }
        [NotMapped]
        public IFormFile? CharacterImage { get; set; }
        public int GameId { get; set; }
        public Game? Game { get; set; }
    }
}
