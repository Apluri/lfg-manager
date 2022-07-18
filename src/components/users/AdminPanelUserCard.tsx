import {
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
  function getRolesList(): Roles[] {
    return [Roles.ADMIN, Roles.MEMBER, Roles.QUEST];
  }
  function handleChangeRole(newRole: Roles) {
    db?.editRole(newRole, userId).catch((e) => console.log(e));
  }

  function handleEditUserName(newUserName: string) {
    db?.editUserName(newUserName, userId);
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

      <Typography sx={styles.rowItem}>TODO: del user</Typography>
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
