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
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Character, Gem } from "../../utils/CharacterUtils";
import berserkerIcon from "../../assets/images/classIcons/berserker.png";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";

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
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card sx={containerStyles}>
      <CardHeader
        avatar={<Avatar src={berserkerIcon} />}
        action={
          <IconButton onClick={handleClick} aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={character.character}
        subheader={`${character.charName}  ${character.itemLevel}`}
      />
      <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
        <MenuItem onClick={() => console.log("edit" + character.charName)}>
          Edit
        </MenuItem>
        <MenuItem onClick={() => handleDelete(character)}>Delete</MenuItem>
      </Menu>

      {/*
  <CardContent>
        <Box sx={styles.row}>
          <Box>
            <Typography>Currently applied to</Typography>
            <Typography variant="body2" color="text.secondary">
              Argos P3 su 16.5 start time: 18.00
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Valtan proge la 15.5 start time: 20.15
            </Typography>
          </Box>
        </Box>
      </CardContent>
  */}

      <CardActions disableSpacing>
        <ExpandMore expand={expanded} onClick={handleExpandClick}>
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="h6">
            Tarivaanko lisätietoo joka ei mahdu? ne tänne:D
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
const styles: { [key: string]: React.CSSProperties } = {
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
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
