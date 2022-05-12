import React from "react";
import {useAuth} from "./providers/AuthContext"

function SignIn() : JSX.Element {
    const {signIn, currentUser} = useAuth()
    return (
        <div>
            <button onClick={() => signIn()} >Log in with google</button>
            {currentUser && currentUser.email}
        </div>
    )
}

export default SignIn