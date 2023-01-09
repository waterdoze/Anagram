import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = ({ isSignedIn, setIsSignedIn }) => {

    const navigate = useNavigate()
    
    const signin = () => {
        setIsSignedIn(true)
        navigate('/game')
    }

    const signout = () => {
        setIsSignedIn(false)
    }

    return (
        <div>
            {isSignedIn ? (
                <div className="d-grid mt-5">
                    <button className="btn-danger" onClick={signout}>
                        Sign out
                    </button>
                </div>
            ) : <div className="d-grid mt-5">
                <button className="btn-dark" onClick={signin}>
                    Sign in
                </button>
            </div>}
        </div>
    )
}

export default Home