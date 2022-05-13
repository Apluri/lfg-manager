import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../providers/AuthContext";
import { useDatabase } from "../providers/DatabaseContext";

function Home() {
  const { currentUser } = useAuth();
  const db = useDatabase();
  return (
    <div className="App">
      <p>etusivu</p>
      <button onClick={() => db?.getTestData()}>jaha</button>
      <button onClick={() => db?.writeTestData()}>write</button>
    </div>
  );
}

export default Home;
