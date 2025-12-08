// components/AddGame.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddGame = () => {
  const [categories, setCategories] = useState([]);
  const [selectedProviderId, setSelectedProviderId] = useState("");
  const [providerGames, setProviderGames] = useState([]);
  const [selectedGames, setSelectedGames] = useState([]);
  const [loadingGames, setLoadingGames] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGame, setEditingGame] = useState(null);
  const [form, setForm] = useState({
    image: null,
    rowSpan: 1,
  });
  const [imagePreview, setImagePreview] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch Categories (providers)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/categories`);
        setCategories(res.data.data || []);
      } catch (err) {
        toast.error("Failed to load providers");
      }
    };
    fetchCategories();
  }, []);

  // Fetch Selected Games
  useEffect(() => {
    const fetchSelectedGames = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/selected-games`);
        setSelectedGames(res.data.data || []);
      } catch (err) {
        toast.error("Failed to load selected games");
      }
    };
    fetchSelectedGames();
  }, []);

  // Fetch Provider Games
  useEffect(() => {
    if (!selectedProviderId) {
      setProviderGames([]);
      return;
    }

    const fetchProviderGames = async () => {
      setLoadingGames(true);
      try {
        const res = await axios.get(
          `https://apigames.oracleapi.net/api/games/pagination?page=1&limit=100&provider=${selectedProviderId}`,
          {
            headers: {
              "x-api-key":
                "b4fb7adb955b1078d8d38b54f5ad7be8ded17cfba85c37e4faa729ddd679d379",
            },
          }
        );
        setProviderGames(res.data.data || []);
      } catch (err) {
        toast.error("Failed to load games");
        setProviderGames([]);
      } finally {
        setLoadingGames(false);
      }
    };
    fetchProviderGames();
  }, [selectedProviderId]);

  const handleSelectGame = async (game) => {
    const isSelected = selectedGames.some((sg) => sg.gameId === game._id);

    try {
      if (isSelected) {
        const selectedGame = selectedGames.find((sg) => sg.gameId === game._id);
        await axios.delete(`${API_URL}/api/selected-games/${selectedGame._id}`);
        setSelectedGames((prev) =>
          prev.filter((sg) => sg._id !== selectedGame._id)
        );
        toast.success("Game removed");
      } else {
        const formData = new FormData();
        formData.append("gameId", game._id);
        formData.append("gameUuid", game.game_uuid);
        formData.append("rowSpan", form.rowSpan);
        if (form.image) formData.append("image", form.image);

        const res = await axios.post(
          `${API_URL}/api/selected-games`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setSelectedGames((prev) => [...prev, res.data.data]);
        toast.success("Game added!");
        resetForm();
      }
    } catch (err) {
      toast.error("Operation failed");
    }
  };

  const openEditModal = (selectedGame) => {
    setEditingGame(selectedGame);
    setForm({
      image: null,
      rowSpan: selectedGame.rowSpan || 1,
    });
    setImagePreview(
      selectedGame.image ? `${API_URL}${selectedGame.image}` : ""
    );
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingGame(null);
    resetForm();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingGame) return;

    try {
      const formData = new FormData();
      formData.append("rowSpan", form.rowSpan);
      if (form.image) formData.append("image", form.image);

      const res = await axios.put(
        `${API_URL}/api/selected-games/${editingGame._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setSelectedGames((prev) =>
        prev.map((sg) => (sg._id === editingGame._id ? res.data.data : sg))
      );
      toast.success("Updated successfully!");
      closeModal();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const resetForm = () => {
    setForm({
      image: null,
      rowSpan: 1,
    });
    setImagePreview("");
  };

  useEffect(() => {
    if (form.image) {
      setImagePreview(URL.createObjectURL(form.image));
    }
  }, [form.image]);

  const isGameSelected = (gameId) =>
    selectedGames.some((sg) => sg.gameId === gameId);
  const getSelectedGame = (gameId) =>
    selectedGames.find((sg) => sg.gameId === gameId);

  return (
    <div className="p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-10 text-yellow-600">
        Add & Manage Games
      </h1>

      {/* Provider Dropdown */}
      <div className="mb-10 bg-white p-6 rounded-2xl shadow-lg border-2 border-yellow-200">
        <label className="block text-lg font-semibold text-gray-700 mb-3">
          Select Provider
        </label>
        <select
          value={selectedProviderId}
          onChange={(e) => setSelectedProviderId(e.target.value)}
          className="w-full max-w-lg px-6 py-4 border-2 border-yellow-300 rounded-xl text-lg focus:ring-4 focus:ring-yellow-200 focus:border-yellow-500 transition"
        >
          <option value="">-- Choose a Provider --</option>
          {categories.map((cat) => (
            <option key={cat.providerId} value={cat.providerId}>
              {cat.providerName} ({cat.categoryName})
            </option>
          ))}
        </select>
      </div>

      {/* Games Section */}
      <div className="mt-8">
        {!selectedProviderId ? (
          <div className="text-center py-20">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 mx-auto mb-6" />
            <p className="text-2xl text-gray-500">
              Please select a provider to view games
            </p>
          </div>
        ) : loadingGames ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">Loading games...</p>
          </div>
        ) : providerGames.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 mx-auto mb-6" />
            <p className="text-3xl font-bold text-gray-500">No Games Found</p>
            <p className="text-lg text-gray-400 mt-3">
              This provider has no games available at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {providerGames.map((game) => {
              const selected = isGameSelected(game._id);
              const selectedData = getSelectedGame(game._id);

              return (
                <div
                  key={game._id}
                  className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:scale-105 ${
                    selected
                      ? "ring-4 ring-yellow-400 border-4 border-yellow-300"
                      : "border border-gray-200"
                  }`}
                >
                  <div className="relative">
                    {selected && selectedData.image ? (
                      <img
                        src={`${API_URL}${selectedData.image}`}
                        alt={game.name}
                        className="w-full h-56 object-cover"
                        onError={(e) => (e.target.src = "/no-image.png")}
                      />
                    ) : game?.projectImageDocs?.filter(
                        (item) => item.projectName?.title
                      )?.length > 0 ? (
                      game.projectImageDocs
                        .filter((item) => item.projectName?.title === "Velki")
                        .map((item) => (
                          <img
                            key={item._id}
                            src={`https://apigames.oracleapi.net/${item.image}`}
                            alt={item.projectName?.title}
                            className="w-full h-56 object-cover"
                            onError={(e) => (e.target.src = "/no-image.png")}
                          />
                        ))
                    ) : (
                      <div className="w-full h-56 flex justify-center items-center bg-gray-200 text-black font-semibold">
                        Image Not Found
                      </div>
                    )}

                    {selected && (
                      <div className="absolute top-3 right-3 bg-yellow-500 text-black font-bold px-3 py-1 rounded-full text-sm">
                        Selected
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="font-bold text-lg text-gray-800 mb-4 line-clamp-2">
                      {game.name}
                    </h3>

                    {/* Select Checkbox */}
                    <label className="flex items-center gap-3 mb-4 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => handleSelectGame(game)}
                        className="w-6 h-6 text-yellow-600 rounded focus:ring-yellow-500"
                      />
                      <span className="font-semibold text-gray-700">
                        {selected ? "Selected" : "Select this game"}
                      </span>
                    </label>

                    {/* Image Upload & Preview & rowSpan (only when not selected yet) */}
                    {!selected && (
                      <div className="space-y-3 mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Upload Image
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            setForm({ ...form, image: e.target.files[0] })
                          }
                          className="w-full px-5 py-3 border-2 border-yellow-300 rounded-xl file:bg-yellow-500 file:text-white file:py-2 file:px-4 file:rounded-full"
                        />
                        {imagePreview && (
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="mt-3 w-full h-32 object-cover rounded-xl border-4 border-yellow-200"
                          />
                        )}
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Row Span in Main Site
                        </label>
                        <select
                          value={form.rowSpan}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              rowSpan: parseInt(e.target.value),
                            })
                          }
                          className="w-full px-5 py-3 border-2 border-yellow-300 rounded-xl"
                        >
                          <option value={1}>1 Row</option>
                          <option value={2}>2 Rows</option>
                          <option value={3}>3 Rows</option>
                          <option value={4}>4 Rows</option>
                        </select>
                      </div>
                    )}

                    {/* Edit Button if selected */}
                    {selected && (
                      <div className="mt-5 pt-5 border-t border-gray-200">
                        <button
                          onClick={() => openEditModal(selectedData)}
                          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-xl mt-4"
                        >
                          Edit Image & Row Span
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {isModalOpen && editingGame && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <h2 className="text-2xl font-bold text-yellow-600 mb-6 text-center">
              Edit Game
            </h2>
            <form onSubmit={handleUpdate} className="space-y-6">
              {/* Image */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload New Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setForm({ ...form, image: e.target.files[0] })
                  }
                  className="w-full px-5 py-3 border-2 border-yellow-300 rounded-xl file:bg-yellow-500 file:text-white file:py-2 file:px-4 file:rounded-full"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-3 w-full h-48 object-cover rounded-xl border-4 border-yellow-200"
                  />
                )}
              </div>

              {/* Row Span */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Row Span in Main Site
                </label>
                <select
                  value={form.rowSpan}
                  onChange={(e) =>
                    setForm({ ...form, rowSpan: parseInt(e.target.value) })
                  }
                  className="w-full px-5 py-3 border-2 border-yellow-300 rounded-xl"
                >
                  <option value={1}>1 Row</option>
                  <option value={2}>2 Rows</option>
                  <option value={3}>3 Rows</option>
                  <option value={4}>4 Rows</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-xl"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddGame;
