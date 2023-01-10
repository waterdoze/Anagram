import React, {useState} from 'react';
import Axios from 'axios';
import { useNavigate, Form } from 'react-router-dom';
import '../../css/Register.css';


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;

export default function Register() {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});


    const handleInputChange = (e) => {
        const {id, value} = e.target;
        switch(id){
            case 'userName':
                setUsername(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'confirmPassword':
                setConfirmPassword(value);
                break;
            default:
                console.log("Error");
    }
}

const handleSubmit = async () =>{
    console.log("Username: " + username);
    console.log('Password: ' + password);
    console.log('Confirm Password: ' + confirmPassword)

    // Validation 
    if(!USER_REGEX.test(username)){
        setErrors({username: "Username is not valid"});
        return;
    }

    const response = await Axios.get(`http://localhost:3001/existsUser/${username}`)
        if (response.data) {
            setErrors({username: "Username already exists"});
            return
        }
    
    if(password.length < 6){
        setErrors({password: "Password must be at least 6 characters"});
        return
    }

    if(password !== confirmPassword){
        setErrors({password: "Passwords do not match"});
        return
    }
    try {
        const response = await Axios.post("http://localhost:3001/userRegister",
            JSON.stringify({ username: username, password: password }),
            {
                headers: { 'Content-Type': 'application/json' },
            }
        );
        console.log(JSON.stringify(response?.data));
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setErrors({});
        navigate('/login');
    } catch (err) {
        console.log(err)
    }
}
    

    return(
        <Form className="form">
            <div className = "title"><u>Register</u></div>

            <div className="form-body">
                <div className="form-username">

                    <div>
                        <label className="form-label" htmlFor="userName"><b>Username</b> </label>
                    </div>

                    <div>
                        <input className="form-input" 
                        type="text" 
                        id="userName" 
                        value = {username}
                        onChange = {(e) => handleInputChange(e)}
                        placeholder="Username"/>
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
                        value = {password}
                        onChange = {(e) => handleInputChange(e)}
                        placeholder="Password"/>
                    </div>

                </div>
                <div className="form-confirm-pw">

                    <div>
                        <label className="form-label" htmlFor="confirmPassword"><b>Confirm Password</b> </label>
                    </div>

                    <div>
                        <input className="form-input" 
                        type="password" 
                        value = {confirmPassword}
                        onChange = {(e) => handleInputChange(e)}
                        id="confirmPassword" 
                        placeholder="Confirm Password"/>
                    </div>

                </div>

                <div className="form-footer">
                    <button onClick={()=>handleSubmit()} type="submit" className="submit-button">Register</button>
                </div>

                {Object.keys(errors).length > 0 && (
                <div className='form-errors'>
                    {Object.values(errors).map(value => <li key={value}>{value}</li>)}
                    
                </div>
                )}
            </div>

            <p>
                Already registered?<br />
                <span>
                    {/*put router link here*/}
                    <a className = "link" href="/login">Sign In</a>
                </span>
            </p>
        </Form>      
    )       
}
