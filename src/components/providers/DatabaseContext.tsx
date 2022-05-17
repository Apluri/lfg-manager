import React, { useContext, useEffect } from "react";
import { database } from "../../firebase";
import { ref, onValue, set } from "firebase/database";
import { useAuth } from "./AuthContext";
import { User } from "firebase/auth";
import { Character, ClassNames } from "../../utils/CharacterUtils";

interface DatabaseContextInterface {
  getTestData: () => void;
  writeTestData: () => void;
}

function writeTestData(): void {
  set(ref(database, "users/" + "testiID"), {
    nickname: "uus nimi:D",
    email: "abc@jotain.com",
  });
}
function getTestData(): void {
  const t = ref(database);
  onValue(t, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
  });
}

type UserData = {
  userName: string;
  characters: Character[];
};
function getUserData(user: User | null): Promise<UserData | null> {
  const t = ref(database, "users/" + user?.uid);
  return new Promise((resolve, reject) => {
    onValue(t, (snapshot) => {
      const data = snapshot.val();
      resolve(data);
    });
  });
}

function createUser(user: User | null): Promise<void> {
  console.log(user);
  if (!user) {
    return new Promise((resolve, reject) =>
      reject("Cant create user of " + user)
    );
  }
  const initialUser: UserData = {
    userName: "Initial username",
    characters: [
      {
        charName: "Ayalup",
        character: ClassNames.ARTILLERIST,
        itemLevel: 1414,
      },
    ],
  };
  return set(ref(database, "users/" + user?.uid), initialUser);
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
  useEffect(() => {
    if (auth?.currentUser != null)
      getUserData(auth.currentUser).then((data) => {
        if (data) {
          // add data to somewhere
          console.log(data);
        } else {
          // no user, create one
          createUser(auth.currentUser).catch((e) => console.log(e));
        }
      });
  }, [auth?.currentUser]);
  const value: DatabaseContextInterface = {
    getTestData,
    writeTestData,
  };
  return <DbContext.Provider value={value}>{children}</DbContext.Provider>;
}
