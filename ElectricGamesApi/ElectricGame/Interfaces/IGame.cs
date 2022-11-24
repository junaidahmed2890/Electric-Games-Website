namespace RestaurantApp.Interfaces
{
    public interface IGame
    {
        public int GameId { get; set; }
        public string Name { get; set; }
        public string Platform { get; set; }
        public string ReleaseYear { get; set; }
        public string ImagePath { get; set; }

    }
}
