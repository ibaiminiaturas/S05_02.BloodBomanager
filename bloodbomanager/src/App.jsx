import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Status from "./pages/Status";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/status" element={<Status />} />
      </Routes>
    </>
  );
}

export default App;
