import { IconButton, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { CustomNavLink } from "./CustomNavLink";

type Props = {
  width: number;
  setWidth: (width: number) => void;
  setSideBarMargin: (pixels: number) => void;
};

export function Sidebar({ width, setWidth, setSideBarMargin }: Props) {
  const themeColors = useTheme().palette;

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
    <Box className="sideBar" sx={{ width: width + "px" }}>
      <IconButton className="closeBtn" onClick={closeSideBar}>
        <CloseIcon />
      </IconButton>

      <Box className="sideBarLinkContainer">
        <Typography variant="caption" sx={{ letterSpacing: 3 }}>
          Navigation
        </Typography>

        <CustomNavLink to="profile" label="Profile" />
        <CustomNavLink to="lfg" label="Lfg" />
        <CustomNavLink to="admin" label="Admin" />
        <CustomNavLink to="/" label="Home" />
      </Box>
    </Box>
  );
}
