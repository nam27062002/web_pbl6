import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import Feedback from './FormFeedback';
import style from './Contacts.module.css';
const Contacts = () => {
    const [isFeedback, setIsFeedback]= useState(false);
    const handleClickFeedback = () => {
        setIsFeedback(!isFeedback);
    }
    return(
        <>
            {isFeedback?<Feedback isOpen={isFeedback} setIsOpen={setIsFeedback}/>:<></>}
           <div className={`container py-5 `}>
                    <div className = {`bg-white rounded p-4 px-5`}>
                        <div>
                            <div className={`${style.titleWrap}`}>
                                <h2 className={`${style.titleLine}`}><span className={`${style.title}`}>Order a ride</span></h2>
                            </div>
                            <div className={`row`}>
                                <h3 className={`${style.h3}`}>Ridewizard ordering app:</h3>
                                <div>
                                    <div className={`${style['app-badges__links']}`}>
                                        <a href="">
                                            <img src="/appstore.svg" alt=""/>
                                        </a>
                                        <a href="">
                                            <img src="googleplay.svg" alt=""/>
                                        </a>
                                    </div>
                                    <a>
                                        <img />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={`${style.titleWrap}`}>
                                <h2 className={`${style.titleLine}`}><span className={`${style.title}`}>Quality Assurance</span></h2>
                            </div>
                            <div className={`row`}>
                                <div className={`col-2`}>
                                    <p>Have something to say?</p>
                                </div>
                                <div className={`col`}> 
                                    <button className={`${style.button}`} onClick={()=>handleClickFeedback()}>Leave feedback</button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className={`${style.titleWrap}`}>
                                <h2 className={`${style.titleLine}`}><span className={`${style.title}`}>Office</span></h2>
                            </div>
                            <div className={`row`}>
                                <div className={`col`}>
                                    <h3 className={`${style.h3}`}>Office address</h3>
                                    <p>16 Warung Jati barat St., RT.2/RW.11, Ragunan, Ps. Minggu, South Jakarta, Special Capital Region of Jakarta 12540</p>
                                </div>
                                <div className={`col`}>
                                    <h3 className={`${style.h3}`}>Email</h3>
                                    <p>Hihi@Hihi.com</p>
                                </div>
                            </div>
                            <div className={`row`}>
                                <div className={`col`}>
                                    <h3 className={`${style.h3}`}>Office hours</h3>
                                    <p>Mon. - Fri.: from 9:00 to 18:00</p>
                                </div>
                                <div className={`col`}>
                                    <h3 className={`${style.h3}`}>Contact person</h3>
                                    <p>ChuBanEch</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default Contacts;