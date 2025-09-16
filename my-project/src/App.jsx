// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SignIn from "./pages/SignIn";
import LogIn from "./pages/LogIn";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/" element={<div className="p-6 text-center">Welcome to MyApp</div>} />
      </Routes>
    </Router>
  );
};

export default App;
