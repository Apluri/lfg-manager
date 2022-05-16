import {
  FormControl,
  InputLabel,
  Modal,
  Paper,
  TextField,
  Typography,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getClassNameList, Character } from "../../utils/CharacterUtils";

type Props = {
  visible: boolean;
  handleClose: () => void;
  handleAddCharacter: (newCharacter: Character) => void;
};
export function CreateCharacterModal({
  visible,
  handleClose,
  handleAddCharacter,
}: Props) {
  const [charName, setCharName] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<string>("");
  useEffect(() => {
    console.log(charName);
  }, [charName]);

  function createNewCharacter() {
    //todo errorchekings
    const newChar: Character = {
      charName,
      character: selectedClass,
      itemLevel: 1504,
      gearSet: "Preordained 5 set",
      engravings: [],
      gems: [],
    };
    return newChar;
  }
  return (
    <Modal
      open={visible}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={styles.modal}
    >
      <Paper sx={styles.container}>
        <Box>
          <TextField
            fullWidth
            label="Character name"
            variant="standard"
            required={true}
            onChange={(e) => setCharName(e.target.value)}
          />
          <FormControl fullWidth sx={{ marginTop: "1em" }}>
            <InputLabel id="demo-simple-select-label">Class</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedClass}
              label="Class"
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              {getClassNameList().map((gameClass) => (
                <MenuItem key={gameClass} value={gameClass}>
                  {gameClass}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={styles.actionButtons}>
          <Button>Cancel</Button>
          <Button onClick={() => handleAddCharacter(createNewCharacter())}>
            Add
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
}
const styles: { [key: string]: React.CSSProperties } = {
  modal: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    padding: "5em",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "1em",
    minWidth: "40%",
    justifyContent: "space-between",
  },
  actionButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
};
