import React, { useEffect, useRef, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Menu, MenuItem, Slide, useScrollTrigger } from "@mui/material";
import { useAuth } from "../providers/AuthContext";
import { ProfileInfo } from "../users/ProfileInfo";
import cuteLogo from "../../assets/images/cute-logo.jpg";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";

const desktopBreakPoint = 768;
const DESKTOP_SIDEBAR_WIDTH = 250;

type Props = {
  setSideBarMargin: (pixels: number) => void;
};
export default function NavBar({ setSideBarMargin }: Props) {
  const auth = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [sideBarWidth, setSideBarWidth] = useState<number>(0); // hidden
  const sideBarRef = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      if (sideBarRef.current === 0) return;
      openSideBar();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const openSideBar = () => {
    if (window.innerWidth > desktopBreakPoint) {
      if (sideBarWidth === DESKTOP_SIDEBAR_WIDTH) return;
      setSideBarWidth(DESKTOP_SIDEBAR_WIDTH);
      sideBarRef.current = DESKTOP_SIDEBAR_WIDTH;
      setSideBarMargin(DESKTOP_SIDEBAR_WIDTH);
    } else {
      setSideBarWidth(window.innerWidth * 0.8);
      sideBarRef.current = window.innerWidth * 0.8;
      setSideBarMargin(0);
    }
  };

  type ScrollProps = {
    children: React.ReactElement;
  };
  // could be used to hide navbar when scrolling down
  // issue, breaks anchorElements to menu items
  function HideOnScroll({ children }: ScrollProps) {
    const trigger = useScrollTrigger();
    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }
  return (
    <>
      <AppBar position="sticky" color="secondary" sx={{ zIndex: 1 }}>
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

          <Box className="app-title-container" onClick={() => navigate("/")}>
            <Typography variant="h4" sx={{ paddingRight: "10px" }}>
              Cute Guild
            </Typography>
            <Avatar src={cuteLogo} sx={{ alignSelf: "center" }} />
          </Box>

          <Box className="profile-btn">
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
      <Sidebar
        width={sideBarWidth}
        setWidth={(num) => {
          setSideBarWidth(num);
          sideBarRef.current = num;
        }}
        setSideBarMargin={setSideBarMargin}
      />
    </>
  );
}
