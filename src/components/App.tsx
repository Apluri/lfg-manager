import React, { useState } from "react";
import "./App.css";
import { AuthProvider } from "../components/providers/AuthContext";
import { Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import NavBar from "./global/NavBar";
import { DatabaseProvider } from "./providers/DatabaseContext";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { AdminPanel } from "./screens/AdminPanel";
import { Profile } from "./users/Profile";
import { LfgScreen } from "./screens/LfgScreen";
import { Box } from "@mui/system";
import { Router } from "./screens/Router";

const darkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "dark",
    },
  })
);

function App() {
  const [sideBarMargin, setSideBarMargin] = useState<number>(0);
  return (
    <ThemeProvider theme={darkTheme}>
      <AuthProvider>
        <DatabaseProvider>
          <LocalizationProvider dateAdapter={AdapterLuxon} locale="fi-FI">
            <NavBar setSideBarMargin={setSideBarMargin} />
            <Router marginLeft={sideBarMargin} />
          </LocalizationProvider>
        </DatabaseProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
