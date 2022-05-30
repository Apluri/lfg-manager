import { Box } from "@mui/system";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "../providers/AuthContext";
import { Profile } from "../users/Profile";
import { AdminPanel } from "./AdminPanel";
import Home from "./Home";
import { LfgScreen } from "./LfgScreen";
import { Login } from "./Login";

export function Router() {
  const auth = useAuth();

  if (auth?.currentUser?.uid === undefined) return <Login />;
  return (
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
  );
}
