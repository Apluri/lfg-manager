import React from "react";
import { Link } from "react-router-dom";
import {useAuth} from "../providers/AuthContext"

function Home (){
    const {currentUser} = useAuth()
    return <div className="App">
        <p>etusivu</p>
     
    </div>
}

export default Home