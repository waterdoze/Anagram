import React from 'react'
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios'

const Login = ({ isSignedIn, setIsSignedIn }) => {
    const userRef = useRef();
    const errRef = useRef();

    const navigate = useNavigate()

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    useEffect(() => {
        if (isSignedIn) {
            navigate('/game')
        }
    }, [isSignedIn])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await Axios.post('http://localhost:3001/userLogin',
            JSON.stringify({ username: user, password: pwd }),
            {
                headers: { 'Content-Type': 'application/json' }
            }
        )

        console.log(response)
        console.log(response.data)

        if (response.data.status === 'ok') {
            setIsSignedIn(true)
        }
        else {
            navigate('/')
        }
    }



    return (
        <div>
            <section className='logWrap'>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                    </div>

                    <button>Sign In</button>
                </form>
                <p>
                    Need an Account?<br />
                    <span className="line">
                        {/*put router link here*/}
                        <a href="/register">Sign Up</a>
                    </span>
                </p>
            </section>
        </div>
    )
}

export default Login