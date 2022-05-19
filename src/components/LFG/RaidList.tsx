import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Character } from "../../utils/CharacterUtils";

const PARTY_SIZE = 4;
type Props = {
  raidSize: number;
  players: Character[];
};
export function RaidList({ raidSize, players }: Props) {
  function displaySlots(startIndex: number, endIndex: number) {
    let raidSlots: JSX.Element[] = [];
    for (let i = startIndex; i < raidSize && i < endIndex; i++) {
      let slotText = "Empty";
      if (players[i] !== undefined) {
        const p = players[i];
        slotText = `${p.charName} ${p.character} ${p.itemLevel}`;
      }
      raidSlots.push(
        <Paper elevation={6} sx={styles.playerCard}>
          <Typography>{slotText}</Typography>
        </Paper>
      );
    }
    return <>{raidSlots}</>;
  }
  return (
    <Box sx={styles.groupContainer}>
      <Box sx={{ ...styles.partyContainer, marginRight: "0.5em" }}>
        {displaySlots(0, PARTY_SIZE)}
      </Box>
      <Box sx={{ ...styles.partyContainer, marginLeft: "0.5em" }}>
        {displaySlots(PARTY_SIZE, raidSize)}
      </Box>
    </Box>
  );
}
const styles: { [key: string]: React.CSSProperties } = {
  groupContainer: {
    display: "flex",
  },
  partyContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
  playerCard: {
    display: "flex",
    flex: 1,
    padding: "10px",
    marginTop: "1em",
  },
};
