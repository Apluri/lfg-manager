import React from "react";
import "../styles/App.css";
import { AuthProvider } from "../components/providers/AuthContext";
import { Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import NavBar from "./global/NavBar";
import { DatabaseProvider } from "./providers/DatabaseContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { Box } from "@mui/system";

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
          <LocalizationProvider dateAdapter={AdapterLuxon} locale="fi-FI">
            <Box sx={{ maxHeight: window.innerHeight, overflow: "hidden" }}>
              <NavBar />
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </Box>
          </LocalizationProvider>
        </DatabaseProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
