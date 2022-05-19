import React, { useContext, useEffect, useState } from "react";
import { database } from "../../firebase";
import { ref, onValue, set } from "firebase/database";
import { useAuth } from "./AuthContext";
import { User } from "firebase/auth";
import { Character, ClassNames } from "../../utils/CharacterUtils";
import { Modal, Paper } from "@mui/material";
import { EditUserName } from "../users/EditUserName";

interface DatabaseContextInterface {
  user: UserData | null;
  editUser: (user: UserData, userId: string) => Promise<void>;
  addCharacter: (newChar: Character) => Promise<void>;
}

export type UserData = {
  userName: string;
  characters: Character[];
};

function editUser(user: UserData, userId: string): Promise<void> {
  return set(ref(database, "users/" + userId), user);
}
function editUserCustomDataAndPath(
  data: any,
  userId: string,
  path?: string
): Promise<void> {
  console.log(path || "pahtia ei löytyny");
  return set(ref(database, "users/" + userId + "/" + path || ""), data);
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
  const [user, setUser] = useState<UserData | null>(null);
  const [userNameModalVisible, setUserNameModalVisible] =
    useState<boolean>(false);

  function getUserData(uid: string): void {
    const t = ref(database, "users/" + uid);
    onValue(t, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        console.log("no data found, probably user not created yet");
        // create new user by giving username
        setUserNameModalVisible(true);
        return;
      }
      setUser({ userName: data.userName, characters: data.characters });
    });
  }

  function handleCreateUser(newUserName: string) {
    console.log(newUserName);
    setUserNameModalVisible(false);
    if (auth?.currentUser != null) {
      const tempUser: UserData = {
        userName: newUserName,
        characters: [
          /*
          {
            id: "testiid",
            charName: "cdu",
            character: ClassNames.SHADOWHUNTER,
            itemLevel: 100,
          },
          */
        ],
      };
      editUser(tempUser, auth.currentUser.uid);
    }
  }
  useEffect(() => {
    if (auth?.currentUser != null) getUserData(auth.currentUser.uid);
    else {
      setUser(null);
    }
  }, [auth?.currentUser]);

  function addCharacter(newChar: Character): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let newCharactersList: Character[] = [];
      if (user?.characters !== undefined) {
        newCharactersList = [...user.characters, newChar];
      } else {
        newCharactersList = [newChar];
      }
      if (auth?.currentUser?.uid !== undefined) {
        return editUserCustomDataAndPath(
          newCharactersList,
          auth.currentUser.uid,
          "characters/"
        );
      }

      reject("could not create character, auth uid not defined");
    });
  }

  const value: DatabaseContextInterface = {
    user,
    editUser,
    addCharacter,
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
