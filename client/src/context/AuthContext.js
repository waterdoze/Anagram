import React, { createContext, useState } from 'react'

export const AuthContext = createContext()

export const AuthContextProvider = (props) => {

    const [auth, setAuth] = useState({
        username: null,
        password: null,
        isSignedIn: false
    })

    return (
        <AuthContext.Provider value={{ auth, setAuth }} >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext