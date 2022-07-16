import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import MemePlans from "../../../assets/images/memeplans.png";

export function FuturePlansIntro() {
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
        }}
      >
        <Box>
          <Typography variant="h2">Future plans</Typography>

          <ul>
            <li>
              <Typography>Calendar view</Typography>
            </li>
            <li>
              <Typography>Discord login and notifications</Typography>
            </li>
            <li>
              <Typography>
                Join and edit LFG applicants with drag and drop
              </Typography>
            </li>
          </ul>
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
        <img src={MemePlans} style={{ maxWidth: 800 }} />
      </Box>
    </Box>
  );
}
