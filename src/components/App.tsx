import React from 'react';
import '../styles/App.css';
import {AuthProvider} from "../components/providers/AuthContext"
import SignIn from './SignIn';
function App() {


  return (
    <AuthProvider>
       <div className="App">
      
      <SignIn/>
    </div>
    </AuthProvider>
   
  );
}

export default App;
