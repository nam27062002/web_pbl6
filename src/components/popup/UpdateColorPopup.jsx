import React, { useState, useEffect } from 'react';
import VehicleService from '../../service/VehicleService';
import VehiclePopup from '../../components/popup/VehiclePopup';
import Popup from 'reactjs-popup';
import { motion } from 'framer-motion';


const UpdateColorPopup = ({ vehicle, callback, className, value }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [veh, setVeh] = useState(null)


    const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
    
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    useEffect(() => {
        if (vehicle) {
            setVeh(vehicle)
            
        }
        // callback(veh)
    }, [])
    const popupContentStyle = {
        width: windowWidth < 768 ? '85%' : '50%', 
        height: 'auto',
        padding: '0px',
        background: "rgba(255, 255, 255, 0)",
        borderRadius: '12px',
        boxShadow: "none"
    };
    const updateData = (data) => {
        setVeh(data)
        callback(data)
    }
    const addData = (data) => {
        callback(data)
    }


    return (
        <>
            <Popup
                trigger={
                    <input type="button" value={value} className={className} />
                                        
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
                            <VehiclePopup
                                vehicle={veh}
                                callback={vehicle?updateData:addData}
                            />
                        </motion.div>                        
                    )
                }
            </Popup>
        </>
    )
}


export default UpdateColorPopup;
