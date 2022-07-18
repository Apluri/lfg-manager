import {
  Avatar,
  Paper,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  CardHeader,
  IconButton,
  Collapse,
  IconButtonProps,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import { Character, classIcons } from "../../utils/CharacterUtils";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import { CreateCharacterModal } from "./CreateCharacterModal";
import { useDatabase } from "../providers/DatabaseContext";
import { Raid } from "../../utils/RaidUtils";
import { DateTime } from "luxon";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

type Props = {
  character: Character;
  containerStyles?: React.CSSProperties;
  handleDelete: (charToDelete: Character) => void;
};
export function CharacterCard({
  character,
  containerStyles,
  handleDelete,
}: Props) {
  const db = useDatabase();
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [editCharVisible, setEditCharVisible] = useState<boolean>(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleEditCharacter(editedChar: Character) {
    db?.editCharacter(editedChar);
    setEditCharVisible(false);
    handleClose();
  }

  function getWeekDay(date: Date): string {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayOfWeek = date.getDay();
    return days[dayOfWeek];
  }
  type PostInfo = {
    title: string;
    startTime: Date;
    raid: Raid;
  };
  function getJoinedPostsInfo(): PostInfo[] {
    const allLfgPosts = db?.lfgPosts;
    if (allLfgPosts === undefined && allLfgPosts === null) return [];

    let joinedPostsInfo: PostInfo[] = [];
    allLfgPosts?.forEach((post) => {
      post.applicants?.forEach((applicant) => {
        if (applicant.character.id === character.id)
          joinedPostsInfo.push({
            title: post.title,
            startTime: new Date(post.startTime),
            raid: post.raid,
          });
      });
    });

    return joinedPostsInfo;
  }
  return (
    <Card sx={containerStyles}>
      <CreateCharacterModal
        visible={editCharVisible}
        handleClose={() => {
          setEditCharVisible(false);
          handleClose();
        }}
        editCharacter={character}
        handleEditCharacter={(editedChar) => handleEditCharacter(editedChar)}
      />
      <CardHeader
        avatar={<Avatar src={classIcons[character.character]} />}
        action={
          <IconButton onClick={handleClick} aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={character.charName}
        subheader={`${character.character}  ${character.itemLevel}`}
      />
      <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
        <MenuItem onClick={() => setEditCharVisible(true)}>Edit</MenuItem>
        <MenuItem onClick={() => handleDelete(character)}>Delete</MenuItem>
      </Menu>

      {getJoinedPostsInfo().length > 0 && (
        <CardContent>
          <Box>
            <Typography>Currently applied to</Typography>
            {getJoinedPostsInfo().map((info, index) => (
              <Typography key={index} variant="body2" color="text.secondary">
                {`${getWeekDay(info.startTime)}
                  ${DateTime.fromISO(info.startTime.toJSON()).toLocaleString(
                    DateTime.TIME_24_SIMPLE
                  )}
                ${info.raid.name} ${info.title}`}
              </Typography>
            ))}
          </Box>
        </CardContent>
      )}
    </Card>
  );
}
const styles: { [key: string]: React.CSSProperties } = {
  column: {
    display: "flex",
    flexDirection: "column",
  },
  gems: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
};
