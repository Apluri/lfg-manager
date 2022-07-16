import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Valtan from "../../../assets/images/dashboard.jpg";

export function FeatureIntro() {
  return (
    <Paper
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
          alignItems: "center",
        }}
      >
        <img src={Valtan} style={{ maxWidth: 800 }} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h2">Core features</Typography>

        <ul>
          <li>
            <Typography>Create / edit raid LFG</Typography>
          </li>
          <li>
            <Typography>Join / leave raid LFG</Typography>
          </li>
          <li>
            <Typography>Create / edit your characters</Typography>
          </li>
          <li>
            <Typography>
              <span style={{ fontWeight: "bold" }}>Admin / LFG post owner</span>{" "}
              edit raid applicants
            </Typography>
          </li>
          <li>
            <Typography>
              <span style={{ fontWeight: "bold" }}>Admin</span> edit user
              permissions
            </Typography>
          </li>
        </ul>
      </Box>
    </Paper>
  );
}
