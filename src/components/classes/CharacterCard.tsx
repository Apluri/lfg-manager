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
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
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

type Engravings = {
  engravings: Character["engravings"];
};
function EngravingList({ engravings }: Engravings) {
  return (
    <Box>
      {engravings.map((engraving, index) => (
        <Typography
          key={index}
          variant="body2"
          color="text.secondary"
        >{`${engraving.name} ${engraving.level}`}</Typography>
      ))}
    </Box>
  );
}

type Props = {
  character: Character;
  containerStyles?: React.CSSProperties;
};
export function CharacterCard({ character, containerStyles }: Props) {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={containerStyles}>
      <CardHeader
        avatar={<Avatar src={berserkerIcon} />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={character.character}
        subheader={`${character.charName}  ${character.itemLevel}`}
      />

      <CardContent>
        <Box sx={styles.row}>
          <EngravingList engravings={character.engravings} />
          <Box>
            <Typography sx={{ textAlign: "end" }}>
              Currently applied to
            </Typography>
            <Typography
              sx={{ textAlign: "end" }}
              variant="body2"
              color="text.secondary"
            >
              Argos P3 su 16.5 start time: 18.00
            </Typography>
            <Typography
              sx={{ textAlign: "end" }}
              variant="body2"
              color="text.secondary"
            >
              Valtan proge la 15.5 start time: 20.15
            </Typography>
          </Box>
        </Box>
      </CardContent>
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
