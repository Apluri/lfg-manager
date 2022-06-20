import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { LostArkRaidNames } from "../../utils/RaidUtils";
import { LfgFilterButtons } from "../LFG/LfgFilterButtons";
import { LfgPosts } from "../LFG/LfgPosts";
import "./LfgScreen.css";

type Props = {
  style?: React.CSSProperties;
};
export function LfgScreen({ style }: Props) {
  const [lfgFilters, setLfgFilters] = useState<LostArkRaidNames[]>([]);
  function toggleFilter(raid: LostArkRaidNames) {
    const raidExistInFilter = lfgFilters.find((r) => r === raid);
    if (raidExistInFilter) {
      setLfgFilters(lfgFilters.filter((r) => r !== raid));
    } else {
      setLfgFilters([...lfgFilters, raid]);
    }
  }
  return (
    <Box
      className="sceenContainer"
      sx={{
        alignItems: "center",
        flexDirection: "column",
        ...style,
      }}
    >
      <Typography sx={{ textAlign: "center" }} variant="h6">
        LFG
      </Typography>
      <LfgFilterButtons lfgFilters={lfgFilters} toggleFilter={toggleFilter} />
      <LfgPosts />
    </Box>
  );
}
