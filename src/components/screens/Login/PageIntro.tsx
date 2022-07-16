import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Valtan from "../../../assets/images/splashArt/valtan.png";
import GitHubIcon from "@mui/icons-material/GitHub";
import { IconButton } from "@mui/material";
import { LoginButtons } from "./LoginButtons";
import useMediaQuery from "@mui/material/useMediaQuery";
export function PageIntro() {
  const isMobile = useMediaQuery("(max-width:768px)");
  const isTablet = useMediaQuery("(max-width:1000px)");
  const handleGitClick = () => {
    window.open("https://github.com/Apluri/lfg-manager");
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isTablet ? "column" : "row",
        padding: "2em",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h2">
          Welcome to the official Cute Guild web application
        </Typography>
        <Typography sx={{ paddingTop: "1em" }}>
          Managing guild in games can be quite handful, therefore this app was
          created to help guild leaders plan out upcoming raids and guild
          events.
        </Typography>
        <LoginButtons />
        <Box sx={{ display: "flex", paddingTop: "1em", alignItems: "center" }}>
          <Typography>Check out the project repository</Typography>
          <IconButton size="large" onClick={handleGitClick}>
            <GitHubIcon fontSize="large" />
          </IconButton>
        </Box>
      </Box>
      {!isMobile && (
        <Box
          sx={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={Valtan} style={{ maxWidth: "90%", height: "auto" }} />
        </Box>
      )}
    </Box>
  );
}
