import React from 'react';
import style from "./MethodRegister.module.css"
import { FaArrowRight } from "react-icons/fa6";
import { FaRegHandPointRight } from "react-icons/fa6";

export default function MethodRegister() {
    return (
        <div className={`container ${style.container_flex}`} >
            <div className={`${style.card_container}`}>
                <h1 className={`${style.step_text}`}>Step 1</h1>
                <div className={`${style.method_item}`}>
                    <h1>Download RideWizard</h1>
                    <div className={`${style.item_text}`}>
                        <p>Download here<FaArrowRight /> <a href="/"> play.google.com/RideWizard</a></p>
                    </div>
                    <img src="./images/register_method/image1.png" alt="" className={`${style.image}`} />
                </div>
                <h1 className={`${style.step_text}`}>Step 2</h1>
                <div className={`${style.method_item}`} >
                    <h1>Open RideWizard App to register</h1>
                    <p>Fill in the information and take clear, complete photos of the documents.</p>
                    <div className={`${style.item_text}`}>
                        <p><FaRegHandPointRight/> Refer to the detailed instructions here.  <a href="/"> play.google.com/RideWizard</a></p>
                    </div>
                    <img src="./images/register_method/image2.png" alt="" className={`${style.image}`} />
                </div>
                <h1 className={`${style.step_text}`}>Step 3</h1>
                <div className={`${style.method_item}`}>
                    <h1>RideWizard reviewing the profile.</h1>
                    <p>Dear Partner, please wait for feedback from RideWizard.</p>
                    <div className={`${style.item_text}`}>
                        <h3>Please regularly check the status of your profile review on the GoPartner app or through SMS notifications.</h3>
                        
                        
                    </div>
                    <img src="./images/register_method/image3.png" alt="" className={`${style.image}`} />
                </div>
                <h1 className={`${style.step_text}`}>Step 4</h1>
                <div className={`${style.method_item}`}>
                    <h1>Profile successfully approved.</h1>
                    <p>RideWizard has sent an SMS notification confirming that your registration profile has been successfully approved.</p>
                    <div className={`${style.item_text}`}>
                        <p><FaRegHandPointRight />Please visit the Support Center to purchase equipment.</p>
                        
                        
                    </div>
                    <img src="./images/register_method/image4.png" alt="" className={`${style.image}`} />
                </div>
                <h1 className={`${style.step_text}`}>Step 5</h1>
                <div className={`${style.method_item}`}>
                    <h1>Activate your account.</h1>
                    <div className={`${style.item_text}`}>
                        <h3>Ready to start the engine, let's hit the road!</h3>
                    </div>
                    <img src="./images/register_method/image5.png" alt="" className={`${style.image}`} />
                </div>
            </div>
                
        </div>
        
    );
  }