import React from "react";
import "../styles/App.css";
import { AuthProvider } from "../components/providers/AuthContext";
import { Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import NavBar from "./global/NavBar";
import { DatabaseProvider } from "./providers/DatabaseContext";
function App() {
  return (
    <AuthProvider>
      <DatabaseProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </DatabaseProvider>
    </AuthProvider>
  );
}

export default App;
