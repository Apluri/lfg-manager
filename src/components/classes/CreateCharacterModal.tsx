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
  const [itemLevel, setItemLevel] = useState<number>(0);

  function createNewCharacter() {
    const newChar: Character = {
      charName,
      character: selectedClass,
      itemLevel,
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
          <FormControl fullWidth sx={{ marginTop: "1em" }} required={true}>
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
          <TextField
            fullWidth
            label="Item level"
            variant="standard"
            type={"number"}
            required={true}
            onChange={(e) => setItemLevel(Number(e.target.value))}
          />
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
