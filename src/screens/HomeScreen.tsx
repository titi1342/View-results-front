import React, { useState } from "react";
import ListScreen from "./ListScreen";
import { FiEye, FiEyeOff } from "react-icons/fi";

const HomeScreen = () => {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/check-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        setIsLoggedIn(true);
        setError("");
        setPassword(""); // reset password input
      } else {
        setError(data.message || "Mot de passe incorrect");
      }
    } catch (err) {
      setError("Erreur de connexion au serveur");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPassword("");
  };

  return (
    <>
      {!isLoggedIn ? (
        <div className="min-h-screen shadow-inner flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-sm bg-white shadow-lg rounded-xl p-6 space-y-6">
          <h2 className="text-2xl text-center text-gray-800 font-custom font-bold">Login Required 🔒</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-2 border font-custom font-semibold border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} // Bascule la visibilité du mot de passe
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 font-custom font-semibold text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
      ) : (
        <>
          <div className="relative min-h-screen flex items-center justify-center bg-gray-100 px-4">
            {/* Container for ListScreen */}
            <div className="w-full h-full">
              <ListScreen />
            </div>
            <button
                onClick={handleLogout}
                className="absolute top-4 right-4 bg-white text-black py-2 px-4 rounded-md border-2
                mr-6 shadow-lg
                border-transparent hover:border-blue-500 hover:bg-blue-600
                 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                Log Out
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default HomeScreen;