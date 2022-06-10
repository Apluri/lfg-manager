import { IconButton, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { CustomNavLink } from "./CustomNavLink";

type Props = {
  width: string;
  setWidth: (width: string) => void;
};

export function Sidebar({ width, setWidth }: Props) {
  const themeColors = useTheme().palette;

  const closeSideBar = () => {
    setWidth("0px");
  };

  return (
    <Box className="sideBar" sx={{ width: width }}>
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
