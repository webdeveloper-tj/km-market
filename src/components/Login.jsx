import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    // Simulating a login process
    setTimeout(() => {
      if (userName === "ITFORS" && password === "2028") {
        setLoading(false);
        navigate("/admin");
      } else {
        setLoading(false);
        setErrorMessage("Invalid username or password");
        setPassword("");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      {/* Container */}
      <motion.div
        className="bg-white text-gray-800 p-8 rounded-lg shadow-2xl sm:w-96 w-64"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <h2 className="text-3xl mb-4 text-center font-semibold">Login</h2>

        {/* Form */}
        <form onSubmit={handleLogin}>
          {/* Username */}
          <div className="mb-4">
            <label htmlFor="username" className="block font-medium mb-1">
              Username
            </label>
            <motion.input
              type="text"
              id="username"
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              whileFocus={{ scale: 1.05 }}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium mb-1">
              Password
            </label>
            <motion.input
              type="password"
              id="password"
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              whileFocus={{ scale: 1.05 }}
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <motion.div
              className="text-red-500 mb-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {errorMessage}
            </motion.div>
          )}

          {/* Login Button */}
          <motion.button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-600 disabled:bg-gray-400"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
