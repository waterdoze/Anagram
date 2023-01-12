import './css/App.css';
import Anagram from './components/game/Anagram';
import Home from './components/Home';
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider, BrowserRouter } from 'react-router-dom'
import { useState } from 'react';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Game from './components/game/Game'


function App() {

    const [isSignedIn, setIsSignedIn] = useState(false)


    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route>
                <Route path='/' element={<Home isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />} />
                <Route path='/login' element={<Login isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn}/>} />
                <Route path='/register' element={<Register />} />
                <Route path='/game' element={<ProtectedRoute isSignedIn={isSignedIn}><Game setIsSignedIn={setIsSignedIn} /></ProtectedRoute>} />
                <Route path='/game/:gameId' element={<ProtectedRoute isSignedIn={isSignedIn}><Anagram setIsSignedIn={setIsSignedIn} /></ProtectedRoute>} />
            </Route>

        )
    )
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>

    );
}

export default App;
