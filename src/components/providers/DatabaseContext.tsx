import React, { useContext, useEffect, useState } from "react";
import { database } from "../../firebase";
import { ref, onValue, set } from "firebase/database";
import { useAuth } from "./AuthContext";
import { User } from "firebase/auth";
import { Character, ClassNames } from "../../utils/CharacterUtils";
import { Modal, Paper } from "@mui/material";
import { EditUserName } from "../users/EditUserName";

interface DatabaseContextInterface {
  user: CustomUser | null;
  editUser: (user: CustomUser) => Promise<void>;
}

export type CustomUser = {
  id: string;
  data: UserData;
};
export type UserData = {
  userName: string;
  characters: Character[];
};

function editUser(user: CustomUser): Promise<void> {
  return set(ref(database, "users/" + user.id), user.data);
}

const DbContext = React.createContext<DatabaseContextInterface | null>(null);

export function useDatabase(): DatabaseContextInterface | null {
  return useContext(DbContext);
}

type Props = {
  children: React.ReactNode;
};
export function DatabaseProvider({ children }: Props) {
  const auth = useAuth();
  const [user, setUser] = useState<CustomUser | null>(null);
  const [userNameModalVisible, setUserNameModalVisible] =
    useState<boolean>(false);

  function getUserData(user: User | null): void {
    const t = ref(database, "users/" + user?.uid);
    onValue(t, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        console.log("no data found, probably user not created yet");
        // create new user by giving username
        setUserNameModalVisible(true);
        return;
      }
      if (user?.uid) {
        setUser({ id: user?.uid, data });
      } else {
        console.log("No user id found");
        return;
      }
    });
  }

  function handleCreateUser(newUserName: string) {
    console.log(newUserName);
    setUserNameModalVisible(false);
    if (auth?.currentUser != null) {
      const tempUser: CustomUser = {
        id: auth.currentUser.uid,
        data: {
          userName: newUserName,
          characters: [],
        },
      };
      editUser(tempUser);
    }
  }
  useEffect(() => {
    if (auth?.currentUser != null) getUserData(auth.currentUser);
    else {
      setUser(null);
    }
  }, [auth?.currentUser]);
  const value: DatabaseContextInterface = {
    user,
    editUser,
  };
  return (
    <DbContext.Provider value={value}>
      <EditUserName
        visible={userNameModalVisible}
        onClose={(newUserName) => handleCreateUser(newUserName)}
        onCancel={() => {
          console.log("canceled do nothing");
        }}
      />
      {children}
    </DbContext.Provider>
  );
}
