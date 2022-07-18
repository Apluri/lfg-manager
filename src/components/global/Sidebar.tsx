import { Button, IconButton, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { CustomNavLink } from "./CustomNavLink";
import { useAuth } from "../providers/AuthContext";
import { Roles, useDatabase } from "../providers/DatabaseContext";

type Props = {
  width: number;
  setWidth: (width: number) => void;
  setSideBarMargin: (pixels: number) => void;
};

export function Sidebar({ width, setWidth, setSideBarMargin }: Props) {
  const themeColors = useTheme().palette;
  const auth = useAuth();
  const db = useDatabase();

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (e.x > width) {
        closeSideBar();
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [width]);
  const closeSideBar = () => {
    setWidth(0);
    setSideBarMargin(0);
  };

  return (
    <Box className="sidebar" sx={{ width: width + "px" }}>
      <IconButton className="closeBtn" onClick={closeSideBar}>
        <CloseIcon />
      </IconButton>

      <Box className="sidebar-container">
        <Box className="sidebar-link-container">
          <Typography variant="caption" sx={{ letterSpacing: 3 }}>
            Navigation
          </Typography>

          <CustomNavLink to="/" label="Dashboard" />
          <CustomNavLink to="profile" label="Profile" />
          <CustomNavLink to="calendar" label="My Calendar" />
          <CustomNavLink to="lfg" label="LFG" />
          {db?.user?.role === Roles.ADMIN && (
            <CustomNavLink to="admin" label="Admin" />
          )}
        </Box>
        <Box className="sidebar-action-container">
          <Typography variant="caption" sx={{ letterSpacing: 3 }}>
            Actions
          </Typography>
          {auth?.currentUser && (
            <Button onClick={() => auth?.logOut()}>Log out</Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
