import { Box, Button } from "@mui/material";
import React from "react";
import { useAuth } from "../providers/AuthContext";

export function ProfileInfo () {
    const {currentUser, logOut} = useAuth()
    return <Box sx={{display:"flex", flexDirection: "row"}}>
 <p>{currentUser && currentUser.email}</p>
 <Button onClick={() => logOut()}> Log out</Button>
    </Box>
   
}