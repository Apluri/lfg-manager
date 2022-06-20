import {
  Accordion,
  AccordionSummary,
  Collapse,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Character } from "../../utils/CharacterUtils";
import { ApplicantCard } from "./ApplicantCard";
import { EmptySlot } from "./EmptySlot";
import { Applicant, LfgPost } from "./LfgPosts";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { useDatabase } from "../providers/DatabaseContext";
import { useAuth } from "../providers/AuthContext";
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const PARTY_SIZE = 4;
type Props = {
  raidSize: number;
  applicants?: Applicant[];
  handleLeaveRaid: (applicant: Applicant) => void;
  post: LfgPost;
};
export function RaidList({
  raidSize,
  applicants,
  handleLeaveRaid,
  post,
}: Props) {
  const [open, setOpen] = useState(false);
  const auth = useAuth();
  function displaySlots(startIndex: number, endIndex: number) {
    let raidSlots: JSX.Element[] = [];
    for (let i = startIndex; i < raidSize && i < endIndex; i++) {
      raidSlots.push(
        applicants && applicants[i] ? (
          <ApplicantCard
            key={applicants[i].uid}
            applicant={applicants[i]}
            handleLeaveRaid={handleLeaveRaid}
            post={post}
          />
        ) : (
          <EmptySlot key={i} />
        )
      );
    }
    return <>{raidSlots}</>;
  }
  function toggleOpen() {
    setOpen(!open);
  }
  function isUserInRaid(): boolean {
    return applicants?.find(
      (applicant) => applicant.uid === auth?.currentUser?.uid
    )
      ? true
      : false;
  }
  return (
    <Box>
      <Box
        onClick={toggleOpen}
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {isUserInRaid() ? (
          <PersonOutlineOutlinedIcon color="success" />
        ) : (
          <PersonOffOutlinedIcon color="disabled" />
        )}

        <Typography>
          {applicants?.length ?? 0} / {raidSize}
        </Typography>
        <ExpandMore
          expand={open}
          onClick={toggleOpen}
          aria-expanded={open}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </Box>

      <Collapse in={open}>
        <Box className="applicantContainer">{displaySlots(0, raidSize)}</Box>
      </Collapse>
    </Box>
  );
}
