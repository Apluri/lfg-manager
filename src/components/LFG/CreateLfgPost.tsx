import { Button, Modal, Paper, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { DateTimePicker } from "@mui/x-date-pickers";
import React, { useState } from "react";
import { ClassNames } from "../../utils/CharacterUtils";
import { useAuth } from "../providers/AuthContext";
import { LfgPost } from "./LfgPosts";
import { v4 as uuidv4 } from "uuid";

type Props = {
  handleAddNewPost: (post: LfgPost) => void;
  visible: boolean;
  handleClose: () => void;
};
export function CreateLfgPost({
  visible,
  handleAddNewPost,
  handleClose,
}: Props) {
  const [title, setTitle] = useState<string>("");
  const [startTime, setStartTime] = useState<Date | null>(new Date());
  const [error, setError] = useState(false);

  const auth = useAuth();

  function validateInputs() {
    let valid = true;

    if (title.length === 0) {
      setError(true);
      valid = false;
    }

    return valid;
  }
  function createNewPost(): LfgPost | null {
    if (auth?.currentUser?.uid === undefined) return null;
    const post: LfgPost = {
      title,
      startTime: startTime?.toJSON() ?? new Date().toJSON(),
      ownerId: auth.currentUser.uid,
      lfgId: uuidv4(),
      applicants: [],
    };
    return post;
  }
  function clearState() {
    setTitle("");
    setStartTime(new Date());
    setError(false);
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
          <Box sx={styles.row}>
            <TextField
              fullWidth
              error={error && title.length === 0}
              label="Title"
              value={title}
              variant="standard"
              required={true}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ ...styles.itemsMargin, marginRight: "5px" }}
            />
          </Box>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="Date and start time"
            value={startTime}
            onChange={(newValue) => setStartTime(newValue)}
          />
        </Box>
        <Box sx={styles.actionButtons}>
          <Button
            onClick={() => {
              clearState();
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (validateInputs()) {
                const newPost = createNewPost();
                if (newPost) handleAddNewPost(newPost);
                clearState();
                handleClose();
              }
            }}
          >
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
