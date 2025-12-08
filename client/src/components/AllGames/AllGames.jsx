import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const AllGames = () => {
  const [selectedGames, setSelectedGames] = useState([]);
  const [gameNames, setGameNames] = useState({});
  const [loading, setLoading] = useState(true);

  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchSelectedGames = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/selected-games`);
        const games = res.data.data || [];

        // নতুন গেম আগে আসবে
        games.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setSelectedGames(games);

        // Oracle API থেকে গেমের নাম নিয়ে আসা
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
          } catch (err) {
            return { gameId: game.gameId, name: "Game Not Found" };
          }
        });

        const names = await Promise.all(namePromises);
        const nameMap = {};
        names.forEach((item) => {
          nameMap[item.gameId] = item.name;
        });
        setGameNames(nameMap);
      } catch (err) {
        console.error("Failed to load selected games:", err);
        toast.error("Failed to load games");
      } finally {
        setLoading(false);
      }
    };

    fetchSelectedGames();
  }, [API_URL]);

  // Play Now ক্লিক হ্যান্ডলার — লগিন চেক করবে
  const handlePlayClick = (gameId) => {
    if (!loginUser) {
      toast.error("Please login to play the game!", {
        duration: 4000,
        position: "top-center",
      });
      navigate("/login");
      return;
    }

    // লগিন থাকলে গেমে নিয়ে যাও
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
      <div className="p-10 text-center text-gray-400">Loading games...</div>
    );
  }

  return (
    <div className="p-2 lg:p-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {selectedGames.map((game) => (
          <div
            key={game._id}
            className={`relative rounded-lg overflow-hidden shadow-lg group cursor-pointer ${getGridSpanClass(
              game.rowSpan
            )}`}
          >
            {/* Image এ ক্লিক করলেও একই চেক হবে */}
            <img
              src={`${API_URL}${game.image}`}
              onClick={() => handlePlayClick(game.gameId)}
              alt={gameNames[game.gameId] || "Loading..."}
              className="w-full h-28 md:h-56 lg:h-72 object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/400x300?text=No+Image";
              }}
            />

            {/* Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-[2px] flex justify-between items-center backdrop-blur-sm">
              <span className="font-semibold text-xs md:text-sm truncate px-2">
                {gameNames[game.gameId] || "Loading name..."}
              </span>

              <button
                onClick={() => handlePlayClick(game.gameId)}
                className="bg-green-600 hover:bg-green-700 px-2 py-1 md:px-3 md:py-2 text-xs md:text-sm rounded-md transition font-medium"
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
