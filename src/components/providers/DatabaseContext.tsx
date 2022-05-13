import React, { useContext } from "react";
import { database } from "../../firebase";
import { ref, onValue, set } from "firebase/database";

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
const DbContext = React.createContext<DatabaseContextInterface | null>(null);

export function useDatabase(): DatabaseContextInterface | null {
  return useContext(DbContext);
}

type Props = {
  children: React.ReactNode;
};
export function DatabaseProvider({ children }: Props) {
  const value: DatabaseContextInterface = {
    getTestData,
    writeTestData,
  };
  return <DbContext.Provider value={value}>{children}</DbContext.Provider>;
}
