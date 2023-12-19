// import React, { useState } from 'react';
import '../styles/Pages/Welcome.css'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { Login } from './Login'
import { motion } from 'framer-motion';


export const Welcome = () => {
const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
    const popupContentStyle = {
        width: windowWidth < 768 ? '85%' : '40%', // 768 là một giả định, bạn có thể thay đổi theo nhu cầu
        height: 'auto',
        padding: '0px',
        background: "rgba(255, 255, 255, 0)",
        borderRadius: '12px',
        boxShadow: "none"
      };
      const history = useHistory();

      const handleButtonClick = () => {
        // Sử dụng history.push để chuyển đến đường dẫn mong muốn
        history.push('/Register');
      };
    return (
        <div >
            <div className="container">
                <div>
                    <div  className="container_banner">
                        <img src="./images/homepage/banner/banner.png" alt="" className="banner" />
                        {/* <Lottie animationData={groovyWalkAnimation} loop={true} className='banner' /> */}
                        <div className="container_form">
                            <h1 className="title">Get in the driver's seat and get paid</h1>
                            <p>Drive on the platform with the largest network of active riders.</p>
                            <div className="container_btn_sign">
                                <Popup 
                                    trigger={
                                        <input type="button" value="Sign in" className="btn_log" />
                                        
                                    }
                                    modal nested
                                    contentStyle={popupContentStyle}
                                >
                                    {
                                        close =>  (
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
                                <input type="button" value="Sign up" className="btn_log"
                                    onClick={() => {
                                        handleButtonClick()
                                    }}
                                />
                            </div>
                            
                        </div>
                    
                    </div>

                </div>
                <div className="container_banner2" > 
                    <img src="./images/homepage/banner/banner2.png" alt="" className='banner2' />
                    <div className="container_form_1">
                        <h1>Uber For Business</h1>
                        <p>Transform the way your company moves and feeds its people.</p>
                        <input type="button" value="See Now" className='btn_log'/>
                    </div>
                </div>
                <div className="focus_on_safety">
                    <h2>Focus on safety, Wherever you go</h2>
                    <div className="container_commitment">
                        <div className='commitment'>
                            <img src="./images/homepage/commitment.png" alt="" />
                            <div>
                            <h3>Our Commitment to your safety</h3>
                            <p>With every safety feature and every standard in our Community Guidelines,
                                we're committed to helping to create a safe environment for our users.</p>
                            </div>
                        </div>
                        <div className='commitment'>
                            <img src="./images/homepage/commitment.png" alt="" />
                            <div>
                                <h3>Setting 10,000+ cities in motion</h3>
                                <p>The app is available in thousands of cities worldwide,
                                    so you can request a ride even when you’re far from home.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container_download_app'>
                    <div className='download_app'>
                        <img src="./images/logo.png" alt="" />
                        <h3>Download the Driver app</h3>
                    </div>
                    <div className='download_app'>
                        <img src="./images/logo.png" alt="" />
                        <h3>Download the Driver app</h3>
                    </div>
                </div>
            </div>
        </div>
            
    );
}

