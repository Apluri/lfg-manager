import React from "react";
import "../styles/App.css";
import { AuthProvider } from "../components/providers/AuthContext";
import { Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import NavBar from "./global/NavBar";
import { DatabaseProvider } from "./providers/DatabaseContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <AuthProvider>
        <DatabaseProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </DatabaseProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
