import { Chip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { lostArkRaidFilterList, LostArkRaidNames } from "../../utils/RaidUtils";

type buttonProps = {
  raid: LostArkRaidNames;
  lfgFilters: LostArkRaidNames[];
  toggleFilter: (raid: LostArkRaidNames) => void;
};
function LfgFitlerButton({ raid, lfgFilters, toggleFilter }: buttonProps) {
  function handleSelect() {
    toggleFilter(raid);
  }
  return (
    <Chip
      label={raid}
      onClick={handleSelect}
      variant={lfgFilters.find((r) => r === raid) ? "filled" : "outlined"}
      sx={{ margin: 1 }}
    />
  );
}

type Props = {
  lfgFilters: LostArkRaidNames[];
  toggleFilter: (raid: LostArkRaidNames) => void;
};
export function LfgFilterButtons({ lfgFilters, toggleFilter }: Props) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      {lostArkRaidFilterList.map((raid) => (
        <LfgFitlerButton
          raid={raid}
          key={raid}
          toggleFilter={toggleFilter}
          lfgFilters={lfgFilters}
        />
      ))}
    </Box>
  );
}
