import HeaderLogin from "../components/header/HeaderLogin"
import '../styles/Pages/Login.css';
import React, { useState } from 'react';
export const Login = () => {
    
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleEmailFocus = () => {
        setIsEmailFocused(true);
        setIsPasswordFocused(false);
    };

    const handlePasswordFocus = () => {
        setIsEmailFocused(false);
        setIsPasswordFocused(true);
    };

    const handleInputBlur = () => {
        setIsEmailFocused(false);
        setIsPasswordFocused(false);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return(
        <div>
            <HeaderLogin/>
            <div className="content">
                <div className="content_left">
                    <img className="background" src="./images/background/background_login.png" alt="background"/>
                </div>
                <div className="content_right">
                    <form className="form-login" onSubmit={handleSubmit}>
                        <div className="form_title_1">Welcome back, Yash</div>
                        <div className="form_title_2">Welcome back!Please enter your details</div>
                        <div className="box_input" style={{ borderBottom: `1px solid ${isEmailFocused ? 'green' : 'rgb(169, 156, 156)'}` }}>
                            <input
                                className="input"
                                placeholder="Email"
                                onFocus={handleEmailFocus}
                                onBlur={handleInputBlur}
                                onChange={handleEmailChange}
                                value={email}/>
                        </div>
                        <div className="box_input" style={{ borderBottom: `1px solid ${isPasswordFocused ? 'green' : 'rgb(169, 156, 156)'}` }}>
                                <input
                                    className="input"
                                    placeholder="Password"
                                    type="password"
                                    onFocus={handlePasswordFocus}
                                    onBlur={handleInputBlur}
                                    onChange={handlePasswordChange}
                                    value={password}/>
                        </div>
                        <div>error</div>
                        <div>
                            <label>
                                <input
                                type="checkbox"
                                />
                                Checkbox Label
                            </label>
                            <a>Forgot Password</a>
                        </div>
                        <button>Login</button>
                        <div>
                            You don't have an account? 
                            <a>
                                Sign up for free    
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )}