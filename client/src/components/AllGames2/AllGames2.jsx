import React from "react";

const games = [
  {
    id: 1,
    name: "Poker",
    image: "https://i.ibb.co.com/XxyR3xHM/Royal-Flush-poker-card-game-gambling.webp",
  },
  {
    id: 2,
    name: "Fast Spin",
    image: "https://i.ibb.co.com/W9xXB7J/hq720.jpg",
  },
  {
    id: 3,
    name: "Roulette",
    image: "https://i.ibb.co.com/XrCsHg5D/ceb2b9555219d76671d0cbe14ce2152df16df0677dd1d4d86772654e649f87b2.jpg",
  },
  {
    id: 4,
    name: "Blackjack",
    image: "https://i.ibb.co.com/VpzcWWmB/blackjack-logo-with-green-ribbon-and-on-a-green-background-isolated-card-game-casino-game-free-vecto.jpg",
  },
  {
    id: 5,
    name: "Baccarat",
    image: "https://i.ibb.co.com/nqWmSQdJ/Baccarat-Rules-1200x675-1.jpg",
  },
  {
    id: 6,
    name: "Slot Machine",
    image: "https://i.ibb.co.com/tpNVnLRd/what-is-a-slot-machine.webp",
  },
];

const AllGames2 = () => {
  return (
    <div className="p-2 lg:p-10">

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {games.map((game) => (
          <div
            key={game.id}
            className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer"
          >
            {/* Game Image */}
            <img
              src={game.image}
              alt={game.name}
              className="w-full h-36 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3 flex justify-between items-center">
              <span className="font-semibold text-lg">{game.name}</span>
              <button className="bg-green-600 px-4 py-1 text-sm rounded-md hover:bg-green-700 transition">
                Play Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllGames2;
