import React from "react";
import "../styles/App.css";
import { AuthProvider } from "../components/providers/AuthContext";
import { Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import NavBar from "./global/NavBar";
function App() {
  return (
    <AuthProvider>
      <NavBar />
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
