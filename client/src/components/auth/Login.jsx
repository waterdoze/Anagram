import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate, Form } from 'react-router-dom';
import Axios from 'axios'
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const Login = () => {

    const { auth, setAuth } = useContext(AuthContext)

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});


    useEffect(() => {
        if (auth.isSignedIn) {
            navigate('/game')
        }
    }, [auth.isSignedIn])

    useEffect(() => {
        console.log("auth is ", auth)
    }, [auth])

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        switch (id) {
            case 'userName':
                setUsername(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                console.log("error")
        }
    }

    const handleSubmit = async () => {
        console.log("Username: " + username);
        console.log('Password: ' + password);

        const response = await Axios.post('http://localhost:3001/userLogin',
            JSON.stringify({ username: username, password: password }),
            {
                headers: { 'Content-Type': 'application/json' }
            }
        )

        if (response.data.status === 'ok') {
            setAuth({ ...auth, username: username, password: password, isSignedIn: true })

        }
        else {
            setErrors({ username: "Username or password is incorrect" })
        }
    }


    return (
        <Form className="form">
            <div className="title"><u>Login</u></div>

            <div className="form-body">
                <div className="form-username">

                    <div>
                        <label className="form-label" htmlFor="userName"><b>Username</b> </label>
                    </div>

                    <div>
                        <input className="form-input"
                            type="text"
                            id="userName"
                            value={username}
                            onChange={(e) => handleInputChange(e)}
                            placeholder="Username" />
                    </div>

                </div>
                <div className="form-password">

                    <div>
                        <label className="form-label" htmlFor="password"><b>Password</b> </label>
                    </div>

                    <div>
                        <input className="form-input"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => handleInputChange(e)}
                            placeholder="Password" />
                    </div>

                </div>


                <div className="form-footer">
                    <button onClick={() => handleSubmit()} type="submit" className="submit-button">Sign In</button>
                </div>

                {Object.keys(errors).length > 0 && (
                    <div className='form-errors'>
                        {Object.values(errors).map(value => <li key={value}>{value}</li>)}

                    </div>
                )}
            </div>

            <p>
                Need an Account?<br />
                <span>
                    {/*put router link here*/}
                    <a className="link" href="/register">Sign Up</a>
                </span>
            </p>
        </Form>
    )
}

export default Login