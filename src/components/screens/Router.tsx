import { Box } from "@mui/system";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "../providers/AuthContext";
import { Profile } from "../users/Profile";
import { AdminPanel } from "./AdminPanel";
import Home from "./Home";
import { LfgScreen } from "./LfgScreen";
import { Login } from "./Login/Login";

type Props = {
  marginLeft: number;
};
export function Router({ marginLeft }: Props) {
  const auth = useAuth();

  if (auth?.currentUser?.uid === undefined)
    return (
      <Box
        className="routerContainer"
        sx={{
          margin: "2em",
          marginTop: "1em",
          marginLeft: marginLeft > 0 ? marginLeft + "px" : "2em",
        }}
      >
        <Login />
      </Box>
    );
  return (
    <Box
      className="routerContainer"
      sx={{
        margin: "2em",
        marginTop: "1em",
        marginLeft: marginLeft > 0 ? marginLeft + "px" : "2em",
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
