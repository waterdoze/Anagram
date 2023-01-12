import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const navigate = useNavigate()

    const signin = () => {
        navigate('/login')
    }

    return (
        <div>
            <div className="d-grid mt-5">
                <button className="btn" onClick={signin}>
                    Sign in
                </button>
            </div>
        </div>
    )
}

export default Home