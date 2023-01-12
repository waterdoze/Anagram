import './css/App.css'
import Anagram from './components/game/Anagram'
import Home from './components/Home'
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { useState } from 'react'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Game from './components/game/Game'
import { AuthContextProvider } from './context/AuthContext'


function App() {

    const [isSignedIn, setIsSignedIn] = useState(false)


    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/game' element={<ProtectedRoute ><Game /></ProtectedRoute>} />
                <Route path='/game/:gameId' element={<ProtectedRoute ><Anagram setIsSignedIn={setIsSignedIn} /></ProtectedRoute>} />
            </Route>

        )
    )
    return (
        <div className="App">
            <AuthContextProvider>
                <RouterProvider router={router} />
            </AuthContextProvider>

        </div>

    )
}

export default App
