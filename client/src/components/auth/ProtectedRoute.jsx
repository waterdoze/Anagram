import React from 'react'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'

const ProtectedRoute = ({ children }) => {

    const { auth } = useContext(AuthContext)

    if (!auth.isSignedIn) {
        console.log("Not signed in")
        return <Navigate to="/" replace />
    }
    return children
}

export default ProtectedRoute