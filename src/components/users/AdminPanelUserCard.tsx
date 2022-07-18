import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Roles, useDatabase, UserData } from "../providers/DatabaseContext";
import { EditUserName } from "./EditUserName";
import { ProfileInfo } from "./ProfileInfo";

type Props = {
  user: UserData;
  userId: string;
};
export function AdminPanelUserCard({ user, userId }: Props) {
  const db = useDatabase();
  const [editUserName, setEditUserName] = useState<boolean>(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [confirmText, setConfirmText] = useState<string>("");
  function getRolesList(): Roles[] {
    return [Roles.ADMIN, Roles.MEMBER, Roles.QUEST];
  }
  function handleChangeRole(newRole: Roles) {
    db?.editRole(newRole, userId).catch((e) => console.log(e));
  }

  function handleEditUserName(newUserName: string) {
    db?.editUserName(newUserName, userId);
  }

  function handleDeleteAccount(userId: string) {
    console.log("now deleting user");
    setConfirmDialogOpen(false);
    //db?.deleteUser(userId)
  }

  function isMatchingUsername(): boolean {
    return user.userName === confirmText;
  }
  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <Box sx={styles.rowItem}>
        <ProfileInfo user={user} onClick={() => setEditUserName(true)} />
      </Box>

      <FormControl>
        <InputLabel id="demo-simple-select-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={user.role}
          label="Role"
          onChange={(e) => handleChangeRole(e.target.value as Roles)}
        >
          {getRolesList().map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button sx={styles.rowItem} onClick={() => setConfirmDialogOpen(true)}>
        Delete User
      </Button>

      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
      >
        <DialogTitle>
          {
            "CAUTION, this is destructive function and deletes account permanently"
          }
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Type {user.userName} to confirm deletion
          </DialogContentText>
          <TextField
            value={confirmText}
            onChange={(value) => setConfirmText(value.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
          <Button
            disabled={!isMatchingUsername()}
            onClick={() => handleDeleteAccount(userId)}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <EditUserName
        visible={editUserName}
        oldName={user.userName}
        onClose={(newUserName) => handleEditUserName(newUserName)}
        onCancel={() => {
          setEditUserName(false);
        }}
      />
    </Paper>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  rowItem: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
  },
};
