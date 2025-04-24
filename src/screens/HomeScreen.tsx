import React, { useEffect, useState } from "react";
import ListScreen from "./ListScreen";
import { FiEye, FiEyeOff } from "react-icons/fi";

const HomeScreen = () => {
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const savedLogin = localStorage.getItem("isLoggedIn");
    if (savedLogin === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://192.168.1.177:5000/check-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, password }),
      });

      const data = await res.json();

      if (data.success) {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true"); // Sauvegarder la connexion dans localStorage
        setError("");
        setUser("");
        setPassword("");
      } else {
        setError(data.message || "Mot de passe incorrect");
      }
    } catch (err) {
      setError("Erreur de connexion au serveur");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn"); // Supprimer l'état de la connexion dans localStorage
    setPassword("");
  };

  return (
    <>
      {!isLoggedIn ? (
        <div className="min-h-screen shadow-inner flex items-center justify-center bg-gray-100 px-4">
          <div className="w-full max-w-sm bg-white shadow-lg rounded-xl p-6 space-y-6">
            <h2 className="text-2xl text-center text-gray-800 font-custom font-bold">Login Required 🔒</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Username */}
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full px-4 py-2 border font-custom font-medium border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                />
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full px-4 py-2 pr-10 border font-custom font-medium border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>

              {/* Error */}
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              {/* Submit */}
              <button
                type="submit"
                className={`w-full bg-blue-600 font-custom font-semibold text-white py-2 rounded-md hover:bg-blue-700 transition
                  disabled:bg-blue-300  
                  ${user === "" || password === "" ? 'cursor-not-allowed' : 'bg-blue-600'}`}
                disabled={user === "" || password === ""}
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
              className="
                absolute top-4 right-4 
                bg-gradient-to-r from-blue-500 to-blue-600 
                dark:from-purple-600 dark:to-indigo-700
                text-white font-medium py-2 px-4 rounded-lg 
                border-none shadow-lg 
                hover:shadow-xl hover:from-blue-600 hover:to-blue-700 
                dark:hover:from-purple-700 dark:hover:to-indigo-800
                transition-all duration-300 ease-in-out 
                transform hover:scale-105 active:scale-95
                focus:outline-none focus:ring-2 focus:ring-blue-400 
                dark:focus:ring-purple-500
              "
            >
              <span className="flex items-center justify-center gap-1">
                Log Out
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7"
                  />
                </svg>
              </span>
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default HomeScreen;