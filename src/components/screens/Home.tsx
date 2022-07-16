import { Box } from "@mui/system";
import { Profile } from "../users/Profile";
import { LfgScreen } from "./LfgScreen";
import "./Home.css";

function Home() {
  return (
    <Box className="screenContainer">
      <LfgScreen
        style={{
          flex: 1,
        }}
      />
      <Profile stackMinWidth={280} />
    </Box>
  );
}

export default Home;
