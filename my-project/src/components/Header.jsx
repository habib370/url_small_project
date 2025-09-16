// src/components/Header.jsx

import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">MyApp</h1>
      <div className="flex gap-4">
        <Link to="/signin">
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">Sign In</button>
        </Link>
        <Link to="/login">
          <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded">Log In</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
