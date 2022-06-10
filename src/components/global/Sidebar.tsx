import { IconButton, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { NavLink } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  width: string;
  setWidth: (width: string) => void;
};

export function Sidebar({ width, setWidth }: Props) {
  const themeColors = useTheme().palette;
  const closeSideBar = () => {
    setWidth("0px");
  };
  const activeStyle = {
    textDecoration: "underline",
    color: themeColors.primary.main,
  };
  const inactiveStyle = {
    textDecoration: "none",
    color: themeColors.text.primary,
  };

  return (
    <Box className="sideBar" sx={{ width: width }}>
      <IconButton className="closeBtn" onClick={closeSideBar}>
        <CloseIcon />
      </IconButton>

      <Box className="sideBarLinkContainer">
        <Typography>Navigation</Typography>
        <NavLink
          className="sideBarLink"
          style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          to={"profile"}
        >
          Profile
        </NavLink>
        <NavLink
          className="sideBarLink"
          style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          to={"lfg"}
        >
          Lfg
        </NavLink>
        <NavLink
          className="sideBarLink"
          style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          to={"admin"}
        >
          Admin
        </NavLink>
        <NavLink
          className="sideBarLink"
          style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          to={"/"}
        >
          Home
        </NavLink>
      </Box>
    </Box>
  );
}
