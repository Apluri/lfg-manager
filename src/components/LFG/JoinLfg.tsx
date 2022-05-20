import {
  Avatar,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import {
  Character,
  classIcons,
  ClassNames,
  getClassNameList,
} from "../../utils/CharacterUtils";
import { LfgPost } from "./LfgPosts";

export type Props = {
  handleClose: () => void;
  visible: boolean;
  onJoin: (char: Character) => void;
  characters: Character[];
};
export function JoinLfg({ visible, onJoin, handleClose, characters }: Props) {
  const [selectedClass, setSelectedClass] = useState<Character>(characters[0]);

  useEffect(() => {
    if (characters) {
      setSelectedClass(characters[0]);
    }
  }, [characters]);

  function getIconSrc() {
    if (selectedClass) {
      return classIcons[selectedClass?.character];
    } else return classIcons.NoClassSelected;
  }
  function handleSelection(charName: string) {
    const newSelectedClass = characters
      .filter((char) => char.charName === charName)
      .pop();
    if (newSelectedClass) {
      setSelectedClass(newSelectedClass);
    }
  }
  if (!characters) <></>;
  return (
    <Modal open={visible} onClose={handleClose} sx={styles.modal}>
      <Paper sx={styles.container}>
        <Typography> Select character you wish to join party with</Typography>
        <FormControl fullWidth sx={styles.itemsMargin} required={true}>
          <InputLabel id="demo-simple-select-label">Class</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedClass?.charName ?? ""}
            label="Class"
            startAdornment={
              <Avatar src={getIconSrc()} sx={{ marginRight: "10px" }} />
            }
            onChange={(e) => handleSelection(e.target.value)}
          >
            {characters?.map((char, index) => (
              <MenuItem key={index} value={char.charName}>
                {`${char.charName} ${char.itemLevel}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={styles.actionButtons}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => onJoin(selectedClass)}>Confrim</Button>
        </Box>
      </Paper>
    </Modal>
  );
}
const styles: { [key: string]: React.CSSProperties } = {
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "5em",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "1em",
    justifyContent: "space-between",
  },
  itemsMargin: {
    marginBottom: "3em",
  },
  actionButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
};
