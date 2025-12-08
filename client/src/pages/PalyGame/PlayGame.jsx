import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const PlayGame = () => {
  {
    const { gameId } = useParams(); // /play-game/:gameId
    const { loginUser, fetchUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [gameUrl, setGameUrl] = useState("");
    const [error, setError] = useState("");
    const [gameInfo, setGameInfo] = useState({
      name: "",
      provider: "",
      deducted: 0,
      newBalance: 0,
    });

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
      // লগিন না থাকলে লগইন পেজে পাঠাও
      if (!loginUser) {
        toast.error("Please login to play the game!");
        navigate("/login");
        return;
      }

      const launchGame = async () => {
        try {
          setLoading(true);
          setError("");

          // এখানে money ডিফল্ট ১ টাকা রাখলাম। পরে চাইলে modal দিয়ে ইউজার ইনপুট নিতে পারো
          const money = 1.0;

          const res = await axios.post(
            `${API_URL}/playgame`,
            {
              gameID: gameId,
              username: loginUser.username,
              money: money,
            }
          );

          if (res.data.success) {
            setGameUrl(res.data.gameUrl);
            setGameInfo({
              name: res.data.gameName || "Game",
              provider: res.data.provider || "Unknown Provider",
              deducted: res.data.deducted,
              newBalance: res.data.new_balance,
            });

            // AuthContext এ balance রিফ্রেশ করো (যদি fetchUser ফাংশন থাকে)
            if (typeof fetchUser === "function") fetchUser();

            toast.success(`${res.data.deducted} deducted • Game launched!`);
          } else {
            throw new Error(res.data.message || "Failed to launch game");
          }
        } catch (err) {
          const msg =
            err.response?.data?.message ||
            err.message ||
            "Unable to launch game. Please try again.";

          setError(msg);
          toast.error(msg);

          // ব্যালেন্স কম বা ইউজার না পেলে হোমে পাঠাও
          if (err.response?.status === 400 || err.response?.status === 404) {
            setTimeout(() => navigate("/"), 3000);
          }
        } finally {
          setLoading(false);
        }
      };

      launchGame();
    }, [gameId, loginUser, navigate, API_URL, fetchUser]);

    const handleBack = () => navigate(-1);

    // Loading State
    if (loading) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
          <div className="text-white text-center">
            <div className="text-2xl font-bold mb-4">Launching Game...</div>
            <span className="loading loading-spinner loading-lg text-green-500"></span>
          </div>
        </div>
      );
    }

    // Error State
    if (error) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-900 to-black flex flex-col items-center justify-center text-white px-4">
          <p className="text-2xl font-bold text-red-400 mb-4">Oops!</p>
          <p className="text-lg text-center max-w-md mb-8">{error}</p>
          <button
            onClick={handleBack}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition shadow-lg"
          >
            Go Back
          </button>
        </div>
      );
    }

    // Success → Game Loaded
    return (
      <div className="min-h-screen bg-black flex flex-col">
        {/* Top Bar */}
        <div className="bg-gradient-to-r from-indigo-800 via-purple-800 to-pink-800 text-white py-3 px-4 flex justify-between items-center shadow-2xl z-10">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition"
          >
            Back
          </button>

          <div className="text-center">
            <h1 className="text-lg md:text-2xl font-bold truncate max-w-xs">
              {gameInfo.name || "Loading..."}
            </h1>
            <p className="text-sm opacity-90">{gameInfo.provider}</p>
          </div>

          <div className="w-20"></div>
        </div>

        {/* Game iFrame */}
        <div className="flex-1 relative overflow-hidden">
          {gameUrl ? (
            <iframe
              src={gameUrl}
              title={gameInfo.name}
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              allow="autoplay; encrypted-media; fullscreen; gyroscope; picture-in-picture"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation allow-modals"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gray-900 flex items-center justify-center text-white">
              Waiting for game URL...
            </div>
          )}
        </div>

        {/* Bottom Bar - Balance Info */}
        {gameInfo.deducted > 0 && (
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-2 px-4 text-center text-sm font-medium">
            {gameInfo.deducted} deducted → New Balance:{" "}
            {gameInfo.newBalance.toFixed(2)}
          </div>
        )}
      </div>
    );
  }
};

export default PlayGame;
