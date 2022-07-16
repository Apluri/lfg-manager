import { Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useAuth } from "../providers/AuthContext";
import { Roles, useDatabase } from "../providers/DatabaseContext";
import { AdminPanelUserCard } from "../users/AdminPanelUserCard";

export function AdminPanel() {
  const auth = useAuth();
  const db = useDatabase();

  function renderUserCards() {
    let userCards = [];
    for (const key in db?.allUsers) {
      if (db?.allUsers[key] !== undefined) {
        userCards.push(
          <AdminPanelUserCard
            key={db?.allUsers[key].userName}
            user={db?.allUsers[key]}
            userId={key}
          />
        );
      }
    }
    return userCards;
  }

  if (!(db?.user?.role === Roles.ADMIN || db?.user?.role === Roles.MEMBER))
    return <Box>Only admins and members are allowed here :)</Box>;

  return (
    <Box
      className="screen-container"
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "70%",
          marginTop: "1em",
        }}
      >
        Admin panul
        <Stack spacing={2} sx={{ width: "100%" }}>
          {renderUserCards()}
        </Stack>
      </Box>
    </Box>
  );
}
