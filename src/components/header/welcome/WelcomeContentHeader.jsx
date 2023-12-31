import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { motion } from 'framer-motion';
import { Login } from '../../../pages/Login';

import './style.css'
import '../../../styles/Header/HeaderLogin.css';


const WelcomeContentHeader = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };
    const [selectedItem, setSelectedItem] = useState("");
    const handleSelectedItem = (item) => {
        setSelectedItem(item)
    }
    const popupContentStyle = {
        width: windowWidth < 768 ? '85%' : '40%', 
        height: 'auto',
        padding: '0px',
        background: "rgba(255, 255, 255, 0)",
        borderRadius: '12px',
        boxShadow: "none"
    };
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
    return (
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-5  ">
                <li className="nav-item">

                    <Link to="/"
                        className={selectedItem === 'home' ? 'active nav-link text-secondary' : 'nav-link text-white'}
                        onClick={() => handleSelectedItem("home")}
                    >Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/about"
                        className={selectedItem === 'about' ? 'active nav-link text-secondary ' : 'nav-link text-white'}
                        onClick={() => handleSelectedItem("about")}
                    >About</Link>
                </li>
                <li className="nav-item">
                    {/* <a className={selectedItem === 'terms' ? 'active nav-link' : 'nav-link'}
                onClick={()=>handleSelectedItem("terms")}
                href="/terms">Terms</a> */}
                    <Link to="/terms"
                        className={selectedItem === 'terms' ? 'active nav-link text-secondary' : 'nav-link text-white'}
                        onClick={() => handleSelectedItem("terms")}
                    >Terms</Link>
                </li>
                <li className="nav-item">
                    <Link className={selectedItem === 'contacts' ? 'active nav-link text-secondary ' : 'nav-link text-white'}
                        onClick={() => handleSelectedItem("contacts")}
                        to="/contacts">Contacts</Link>
                </li>
                <li className="nav-item ">
                    <Link className={selectedItem === 'policy-privacy' ? 'active nav-link text-secondary ' : 'nav-link text-white'}
                        onClick={() => handleSelectedItem("policy-privacy")}
                        to="/policy-privacy">Policy Privacy</Link>
                </li>
            
            </ul>
            <div>
                
                <Link to="/register" className="btn bg-info mx-3 text-light">Register</Link>
                <Popup
                    trigger={
                        <input type="button" value="Sign in" className="btn btn_log-header text-light" />
                                        
                    }
                    modal nested
                    contentStyle={popupContentStyle}
                >
                    {
                        close => (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Login></Login>
                            </motion.div>
                                                
                        )
                    }
                </Popup>
            </div>
        </div>
    );
}

export default WelcomeContentHeader