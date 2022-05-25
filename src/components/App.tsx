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
import { AdminPanel } from "./screens/AdminPanel";
import { Profile } from "./users/Profile";
import { LfgScreen } from "./screens/LfgScreen";
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
            <NavBar />
            <Box
              sx={{
                margin: "2em",
                marginTop: "1em",
              }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/lfg" element={<LfgScreen />} />
              </Routes>
            </Box>
          </LocalizationProvider>
        </DatabaseProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
