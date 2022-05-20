import { Button, Modal, Paper, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { DateTimePicker } from "@mui/x-date-pickers";
import React, { useState } from "react";
import { LfgPost } from "./LfgPosts";

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

  function validateInputs() {
    let valid = true;

    if (title.length === 0) {
      setError(true);
      valid = false;
    }

    return valid;
  }
  function createNewPost(): LfgPost {
    const post: LfgPost = {
      title,
      startTime: startTime ?? new Date(),
      ownerId: "TlKCLu9n2TYktiGbrEfrhvYRVfK2",
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
                handleAddNewPost(createNewPost());
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
