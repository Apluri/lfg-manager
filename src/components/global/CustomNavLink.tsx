import { useTheme } from "@mui/material";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

type Props = {
  to: string;
  label: string;
};

export function CustomNavLink({ to, label }: Props) {
  const themeColors = useTheme().palette;
  const [hover, setHover] = useState(false);

  const activeStyle = {
    textDecoration: "underline",
    color: themeColors.primary.main,
  };
  const inactiveStyle = {
    textDecoration: "none",
    color: themeColors.text.primary,
  };
  const hoverStyle = {
    color: themeColors.primary.dark,
    textDecoration: "none",
  };

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    setHover(true);
  };
  const handleMouseLeave = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    setHover(false);
  };

  return (
    <NavLink
      onMouseEnter={(e) => handleMouseEnter(e)}
      onMouseLeave={(e) => handleMouseLeave(e)}
      className="sidebar-link"
      style={({ isActive }) => {
        if (hover) return hoverStyle;
        if (isActive) return activeStyle;
        else return inactiveStyle;
      }}
      to={to}
    >
      {label}
    </NavLink>
  );
}
