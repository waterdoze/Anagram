import './css/App.css';
import Anagram from './components/game/Anagram';
import Home from './components/Home';
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider, BrowserRouter } from 'react-router-dom'
import { useState } from 'react';
import ProtectedRoute from './components/auth/ProtectedRoute';


function App() {

    const [isSignedIn, setIsSignedIn] = useState(null)


    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route>
                <Route path='/' element={<Home isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />} />
                <Route path='/game' element={<ProtectedRoute isSignedIn={isSignedIn}><Anagram setIsSignedIn={setIsSignedIn} /></ProtectedRoute>} />
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
