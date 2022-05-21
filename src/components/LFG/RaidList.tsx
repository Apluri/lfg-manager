import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Character } from "../../utils/CharacterUtils";
import { ApplicantCard } from "./ApplicantCard";
import { EmptySlot } from "./EmptySlot";
import { Applicant } from "./LfgPosts";

const PARTY_SIZE = 4;
type Props = {
  raidSize: number;
  applicants?: Applicant[];
  handleLeaveRaid: (applicant: Applicant) => void;
};
export function RaidList({ raidSize, applicants, handleLeaveRaid }: Props) {
  function displaySlots(startIndex: number, endIndex: number) {
    let raidSlots: JSX.Element[] = [];
    for (let i = startIndex; i < raidSize && i < endIndex; i++) {
      raidSlots.push(
        applicants && applicants[i] ? (
          <ApplicantCard
            key={i}
            applicant={applicants[i]}
            handleLeaveRaid={handleLeaveRaid}
          />
        ) : (
          <EmptySlot key={i} />
        )
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
