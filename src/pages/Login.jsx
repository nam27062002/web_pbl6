import HeaderLogin from "../components/header/HeaderLogin"
import '../styles/Pages/Login.css';
import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
export const Login = () => {
    const history = useHistory();
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [token, setToken] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const becomeToDriver = async (token) => {
        try {
          const response = await axios.get('http://ridewizard.pro:9000/api/v1/drivers/drive', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };

    const openPopup = () => {
        setPopupOpen(true);
      };
    
      const closePopup = () => {
        setPopupOpen(false);
      };
    
      const handleConfirm = () => {
        becomeToDriver(token);
        closePopup();
        history.push(
            {
                pathname: '/register',
                state: {
                  contentTypeToSet: 'confirmOTP',
                  inputValueToSet: phoneNumber.replace("+84", "0"),
                  tokenToSet: token,
                  runCountdownToSet: true,
                }
            }
          );
      };
    
      const handleCancel = () => {
        closePopup();
      };
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
        setError('');
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setError('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (email === '') {
            setError('Email is required');
            return;
        }
        if (password === '') {
            setError('Password is required');
            return;
        }
        if (!validateEmail(email)) {
            setError('Invalid email address');
            return;
        }
        const checkbox = document.querySelector('.checkbox-input');
        if (!checkbox.checked) {
            setError('Please accept the Terms & Conditions');
            return;
        }

        try {
            const response = await fetch('http://ridewizard.pro:9000/api/v1/users/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: email,
                    password: password,
                    type: 'email',
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message);
                throw new Error('Login failed');
            }

            const data = await response.json();
            console.log(data);
            setToken(data.data.accessToken);
            setPhoneNumber(data.data.user.phNo);
            if (data.data.user.driverStatus === "You are not a driver"){
                openPopup();
            }
            else{
                history.push(
                    data.data.user.phone_verified === 0
                      ? {
                          pathname: '/register',
                          state: {
                            contentTypeToSet: 'confirmOTP',
                            inputValueToSet: data.data.user.phNo.replace("+84", "0"),
                            tokenToSet: data.data.accessToken,
                            runCountdownToSet: true,
                          },
                        }
                      : {
                          pathname: '/home',
                          state: {
                            accessTokenToSet: data.data.accessToken,
                            userIdToSet: data.data.user.id,
                          },
                        }
                  );
            }
            
        } catch (error) {
            console.error('Error calling API:', error.message);
           
        }
        
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    
    return(
        <div>
            <HeaderLogin/>
            <div className="content1">
                <div className="content_left1">
                    <img className="background" src="./images/background/background_login.png" alt="background"/>
                </div>
                <div className="content_right1">
                    <form className="form-login" onSubmit={handleSubmit}>
                        <div className="form_title_1">Welcome back, Yash</div>
                        <div className="form_title_2">Welcome back!Please enter your details</div>
                        <div className="box_input" style={{ borderBottom: `2px solid ${isEmailFocused ? 'green' : 'rgb(169, 156, 156)'}` }}>
                            <input
                                className="input"
                                placeholder="Email"
                                onFocus={handleEmailFocus}
                                onBlur={handleInputBlur}
                                onChange={handleEmailChange}
                                value={email}/>
                        </div>
                        <div className="box_input" style={{ borderBottom: `2px solid ${isPasswordFocused ? 'green' : 'rgb(169, 156, 156)'}` }}>
                                <input
                                    className="input"
                                    placeholder="Password"
                                    type="password"
                                    onFocus={handlePasswordFocus}
                                    onBlur={handleInputBlur}
                                    onChange={handlePasswordChange}
                                    value={password}/>
                        </div>
                        <div className="error-text">{error}</div>
                        <div className="box">
                            <label className="checkbox-label">
                                <input className="checkbox-input"
                                type="checkbox"
                                />
                                Terms & Conditions
                            </label>
                            <a className="forgot_pw_text" href="#">Forgot Password</a>
                        </div>
                        <button className="login-btn">Log In</button>
                        <div className="no-account-text">
                            You don't have an account? 
                            <Link to="/register" className="sign-up">
                                Sign up for free
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            <div className="pop-up">
                {isPopupOpen && (
                    <div className="popup-overlay">
                        <div className="popup">
                            <span className="close" onClick={closePopup}>
                            &times;
                            </span>
                            <p>Bạn có muốn trở thành tài xế?</p>
                            <div className="button-container">
                            <button onClick={handleConfirm} className="btn_confirm">Xác nhận</button>
                            <button onClick={handleCancel} className="btn_cancel">Hủy</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
       

    )}