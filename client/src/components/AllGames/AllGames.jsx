import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { IoBarcodeSharp } from "react-icons/io5";

const AllGames = () => {
  const [selectedGames, setSelectedGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]); // নতুন: ফিল্টারড লিস্ট
  const [gameNames, setGameNames] = useState({});
  const [liveNavbarItems, setLiveNavbarItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const { loginUser, gameSearchQuery } = useContext(AuthContext); // setGameSearchQuery দরকার নেই এখানে
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Selected Games
        const selectedRes = await axios.get(`${API_URL}/api/selected-games`);
        const games = selectedRes.data.data || [];
        games.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        setSelectedGames(games);
        setFilteredGames(games); // প্রথমে সব দেখাবে

        // 2. Oracle API থেকে গেমের নাম
        const namePromises = games.map(async (game) => {
          try {
            const oracleRes = await axios.get(
              `https://apigames.oracleapi.net/api/games/${game.gameId}`,
              {
                headers: {
                  "x-api-key":
                    "b4fb7adb955b1078d8d38b54f5ad7be8ded17cfba85c37e4faa729ddd679d379",
                },
              }
            );
            return {
              gameId: game.gameId,
              name: oracleRes.data.data?.name || "Unknown Game",
            };
          } catch {
            return { gameId: game.gameId, name: "Game Not Found" };
          }
        });

        const names = await Promise.all(namePromises);
        const nameMap = {};
        names.forEach((item) => (nameMap[item.gameId] = item.name));
        setGameNames(nameMap);

        // 3. Navbar Items থেকে Live Data
        const navbarRes = await axios.get(`${API_URL}/api/navbar-items`);
        const navbarItems = navbarRes.data || [];
        setLiveNavbarItems(navbarItems);
      } catch (err) {
        console.error("Error loading data:", err);
        toast.error("Failed to load games");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API_URL]);

  // নতুন: সার্চ কোয়েরি চেঞ্জ হলে ফিল্টার করো
  useEffect(() => {
    if (!gameSearchQuery || gameSearchQuery.trim() === "") {
      setFilteredGames(selectedGames);
      return;
    }

    const query = gameSearchQuery.toLowerCase().trim();
    const filtered = selectedGames.filter((game) => {
      const gameName = gameNames[game.gameId] || "";
      return gameName.toLowerCase().includes(query);
    });

    setFilteredGames(filtered);
  }, [gameSearchQuery, selectedGames, gameNames]);

  const handlePlayClick = (gameId) => {
    if (!loginUser) {
      toast.error("Please login to play the game!");
      navigate("/login");
      return;
    }
    navigate(`/play-game/${gameId}`);
  };

  const getGridSpanClass = (rowSpan) => {
    const span = Math.min(rowSpan || 1, 4);
    const desktop = {
      1: "lg:col-span-1",
      2: "lg:col-span-2",
      3: "lg:col-span-3",
      4: "lg:col-span-4",
    }[span];
    const mobile = span === 1 ? "col-span-1" : "col-span-2";
    return `${mobile} ${desktop}`;
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-400 text-xl">
        Loading games...
      </div>
    );
  }

  // যদি কোনো গেম না ম্যাচ করে
  if (filteredGames.length === 0) {
    return (
      <div className="p-10 text-center">
        <p className="text-gray-400 text-xl">
          No games found for "{gameSearchQuery}"
        </p>
        <p className="text-gray-500 mt-4">
          Try searching for Cricket, Soccer, Casino, etc.
        </p>
      </div>
    );
  }

  return (
    <div className="p-2 lg:p-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {filteredGames.map((game, index) => (
          <div
            key={game._id}
            className={`relative overflow-hidden shadow-lg group cursor-pointer ${getGridSpanClass(
              game.rowSpan
            )}`}
          >
            <img
              src={`${API_URL}${game.image}`}
              onClick={() => handlePlayClick(game.gameId)}
              alt={gameNames[game.gameId]}
              className="w-full h-28 md:h-56 lg:h-72 object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/400x300?text=No+Image";
              }}
            />

            {/* 🔴 ONLY FIRST GAME LIVE OVERLAY - Dynamic from DB */}
            {index === 0 && (
              <div className="absolute top-0 right-0 bg-gradient-to-b from-black/80 to-black/10 text-white text-xs p-1 md:p-2 w-16 md:w-28">
                <div className="flex items-center mb-1 md:mb-2 font-bold justify-center md:justify-start">
                  <span className="bg-white text-red-600 px-1 py-[2px] md:py-1 rounded-l text-[10px] md:text-[16px] font-bold">
                    <IoBarcodeSharp />
                  </span>
                  <span className="bg-red-500 text-white rounded-r px-1 text-[10px] md:text-[16px] font-bold">
                    LIVE
                  </span>
                </div>

                <ul className="space-y-[2px] text-[10px] md:text-[16px]">
                  {liveNavbarItems.map((item) => (
                    <li key={item._id} className="flex justify-between">
                      <span className="truncate">{item.name}</span>
                      <span className="bg-white text-black p-[1px] md:p-1 rounded-sm font-bold">
                        {item.liveCount || 0}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Bottom Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-[2px] flex justify-between items-center backdrop-blur-sm">
              <span className="font-semibold text-xs md:text-sm truncate px-2">
                {gameNames[game.gameId] || "Loading..."}
              </span>
              <button
                onClick={() => handlePlayClick(game.gameId)}
                className="bg-green-600 hover:bg-green-500 text-white font-bold px-1 py-1 md:py-2 md:px-4 rounded-md text-sm transition"
              >
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
