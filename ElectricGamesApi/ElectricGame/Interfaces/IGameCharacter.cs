namespace RestaurantApp.Interfaces
{
    public interface IGameCharacter
    {
        public int GameCharacterId { get; set; }
        public string Name { get; set; }
        public string ImagePath { get; set; }
        public int GameId { get; set; }
    }
}
