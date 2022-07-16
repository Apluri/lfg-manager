import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Valtan from "../../../assets/images/splashArt/Splash8.png";
import GitHubIcon from "@mui/icons-material/GitHub";
import { IconButton } from "@mui/material";

export function PageIntro() {
  const handleGitClick = () => {
    window.open("https://github.com/Apluri/lfg-manager");
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
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
        <Box sx={{ display: "flex", paddingTop: "1em", alignItems: "center" }}>
          <Typography>Check out the project repository</Typography>
          <IconButton size="large" onClick={handleGitClick}>
            <GitHubIcon fontSize="large" />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src={Valtan} style={{ maxWidth: 800 }} />
      </Box>
    </Box>
  );
}
