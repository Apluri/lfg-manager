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
type Props = {
  character: Character;
  containerStyles?: React.CSSProperties;
};
export function CharacterCard({ character, containerStyles }: Props) {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  function getGemByType(type: Gem["type"]): Gem[] {
    return character.gems.filter((gem) => gem.type === type);
  }
  function getShortEngravings(): string {
    let engravings = "";
    character.engravings.forEach(
      (engraving) => (engravings += engraving.level)
    );
    return engravings;
  }
  function averageGemLevel(): string {
    let sumOfGemLevels = 0;
    character.gems.forEach((gem) => (sumOfGemLevels += gem.level));

    return (sumOfGemLevels / character.gems.length).toFixed(1);
  }
  return (
    <Card>
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
        <Typography variant="body2" color="text.secondary">
          Engravings {getShortEngravings()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Gems average level {averageGemLevel()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Cardset: lostwind 12 awa
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Gearset: Preordained 5set
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="h6">Engravings</Typography>
          {character.engravings.map((engraving) => (
            <Typography
              variant="body2"
              color="text.secondary"
            >{`${engraving.name} ${engraving.level}`}</Typography>
          ))}

          <Typography variant="h6" sx={{ paddingTop: 2 }}>
            Gems
          </Typography>
          <Box sx={styles.gems}>
            <Box>
              <Typography paragraph>Cdr</Typography>
              {getGemByType("cdr").map((gem) => (
                <Typography
                  variant="body2"
                  color="text.secondary"
                >{`Level ${gem.level} ${gem.skillName} `}</Typography>
              ))}
            </Box>
            <Box>
              <Typography paragraph>Atk</Typography>
              {getGemByType("atk").map((gem) => (
                <Typography
                  variant="body2"
                  color="text.secondary"
                >{`Level ${gem.level} ${gem.skillName} `}</Typography>
              ))}
            </Box>
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
}
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "1em",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
