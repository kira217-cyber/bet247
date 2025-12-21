import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

const GamePlay = () => {
  const { id } = useParams(); // url থেকে /cricket → id = "cricket"
  const [gameUrl, setGameUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchGameUrl = async () => {
      try {
        // প্রথমে এই url থেকে gameId বের করো
        const res = await axios.get(`${API}/api/navbar-dynamic-items`);
        const gameItem = res.data.find(
          (item) => item.url === `/${id}` || item.url === id
        );

        if (!gameItem || !gameItem.gameId) {
          setError("Game not found");
          setLoading(false);
          return;
        }

        // এখন gameplay API কল করো
        const playRes = await axios.post(`${API}/api/gameplay`, {
          gameId: gameItem.gameId,
        });

        if (playRes.data.success) {
          setGameUrl(playRes.data.gameUrl);
        } else {
          setError(playRes.data.message || "Failed to load game");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to launch game. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchGameUrl();
  }, [id, API]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <div className="bg-black text-white p-4 text-center font-bold text-xl">
        {id ? id.charAt(0).toUpperCase() + id.slice(1) : "Game"} - Live
      </div>

      {loading && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-white text-2xl">Loading game...</div>
        </div>
      )}

      {error && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-red-500 text-xl">{error}</div>
        </div>
      )}

      {gameUrl && (
        <iframe
          src={gameUrl}
          title="Game Play"
          className="flex-1 w-full border-0"
          allowFullScreen
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation"
        />
      )}
    </div>
  );
};

export default GamePlay;