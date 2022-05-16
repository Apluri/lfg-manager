import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar } from "@mui/material";
import { useAuth } from "../providers/AuthContext";
import { ProfileInfo } from "../users/ProfileInfo";
import cuteLogo from "../../assets/images/cute-logo.jpg";

export default function NavBar() {
  const auth = useAuth();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-start" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Box
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
              <ProfileInfo />
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
