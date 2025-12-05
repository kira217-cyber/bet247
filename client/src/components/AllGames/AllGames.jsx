import React from "react";

const games = [
  {
    id: 1,
    name: "Play8",
    image: "https://i.ibb.co.com/mCn80gTq/ETFr-DKk6w-G7j-Ib-QAw-Fe4nm8-Pvo6-BUWRPugch-ZYvu.webp",
  },
  {
    id: 2,
    name: "FastSpin",
    image: "https://i.ibb.co.com/JjH8GXPK/maxresdefault.jpg",
  },
  {
    id: 3,
    name: "ILoveU",
    image: "https://i.ibb.co.com/NnKxWCZC/apps-6458-14353780560698029-ebd0d5e5-940e-4b86-a563-4518bd770f6e.jpg",
  },
  {
    id: 4,
    name: "AE Sexy",
    image: "https://i.ibb.co.com/VYDtybRb/betgames-wheelpr.jpg",
  },
  {
    id: 5,
    name: "Casino",
    image: "https://i.ibb.co.com/1G3KbhCt/5120.jpg",
  },
  {
    id: 6,
    name: "Ezugi",
    image: "https://i.ibb.co.com/S4mHh38t/header-ace-playing-cards.webp",
  },
  {
    id: 7,
    name: "Evolution",
    image: "https://i.ibb.co.com/tTN4Myzr/2018-september-first-person-gaming-roulette-7-0.jpg",
  },
  {
    id: 8,
    name: "Pragmatic",
    image: "https://i.ibb.co.com/zTsvs4Vj/pngtree-strategies-and-elements-in-poker-gambling-bluffs-betting-chips-luck-and-tactical-gameplay-ph.webp",
  },
  {
    id: 9,
    name: "Spade",
    image: "https://i.ibb.co.com/DDymCtcv/images.jpg",
  },
  {
    id: 10,
    name: "Cricket",
    image: "https://i.ibb.co.com/5bJV0Ff/Light-Wonder-Games-Blog.png",
  },
  {
    id: 11,
    name: "Soccer",
    image: "https://i.ibb.co.com/4RmKfsgb/istockphoto-1627628253-612x612.jpg",
  },
  {
    id: 12,
    name: "Tennis",
    image: "https://i.ibb.co.com/4nzgm6RV/shutterstock-2488096013.webp",
  },
];

const AllGames = () => {
  return (
    <div className="p-2 lg:p-10">

      {/* Responsive Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {games.map((game) => (
          <div
            key={game.id}
            className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer"
          >
            {/* Game Image */}
            <img
              src={game.image}
              alt={game.name}
              className="w-full h-28 md:h-56 lg:h-60 object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-[2px] flex justify-between items-center">
              <span className="font-semibold">{game.name}</span>
              <button className="bg-green-600 px-1 py-1 text-sm rounded-md hover:bg-green-700 transition">
                Play Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllGames;
