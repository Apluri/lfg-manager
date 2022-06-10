import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { useAuth } from "../providers/AuthContext";
import { ProfileInfo } from "../users/ProfileInfo";
import cuteLogo from "../../assets/images/cute-logo.jpg";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export default function NavBar() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [sideBarWidth, setSideBarWidth] = useState<number>(0); // hidden

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const openSideBar = () => {
    setSideBarWidth(250);
  };

  return (
    <Box sx={{}}>
      <AppBar position="static" color="secondary">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-start" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={openSideBar}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Sidebar width={sideBarWidth} setWidth={setSideBarWidth} />
          <Box
            onClick={() => navigate("/")}
            sx={{
              display: "flex",
              flex: 1,
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <Typography variant="h4" sx={{ paddingRight: "10px" }}>
              Cute guild
            </Typography>
            <Avatar src={cuteLogo} sx={{ alignSelf: "center" }} />
          </Box>

          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            {auth?.currentUser ? (
              <>
                {auth.currentUser.isAnonymous ? (
                  <Typography
                    onClick={handleClick}
                    sx={{ display: "flex", alignSelf: "center" }}
                  >
                    Anonymous user
                  </Typography>
                ) : (
                  <ProfileInfo onClick={handleClick} />
                )}
                <IconButton onClick={handleClick}>
                  <ArrowDropDownIcon />
                </IconButton>
                <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
                  <MenuItem
                    onClick={() => {
                      navigate("/profile");
                      handleClose();
                    }}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      auth?.logOut();
                      handleClose();
                    }}
                  >
                    Log out
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button color="inherit" onClick={() => auth?.signIn()}>
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
