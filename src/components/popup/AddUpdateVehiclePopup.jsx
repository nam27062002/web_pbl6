import React, { useState, useEffect } from 'react';
import VehicleService from '../../service/VehicleService';
import VehiclePopup from '../../components/popup/VehiclePopup';
import Popup from 'reactjs-popup';
import { motion } from 'framer-motion';
import util from '../../util';

const AddUpdateVehiclePopup = ({ vehicleModel, callback, className, value }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [model, setModel] = useState(null)
    

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
        if (vehicleModel) {
            setModel(vehicleModel)
            
            
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
    
    const types = [
        {
            type: "car", name: "Car"
        },
        {
            type: "motorcycles", name: "Motorcycles"
        },
    ]
    const PopupView = ({close}) => {
        const [modelValue, setModelValue] = useState("")
        const [type, setType] = useState("")
        useEffect(() => {
            if (model) {
                setModelValue(vehicleModel.model)
                setType(vehicleModel.type)
            }
            
        },[])

        const updateData = async () => {
            try {
                const res = await VehicleService.updateVehicleModel(vehicleModel.id, modelValue, type);
                console.log(res);
                if (res.data.success) {
                    let data = {
                        id: vehicleModel.id,
                        model: modelValue,
                        type: type
                    };
                    util.showToastSuccess("Update successful");
                    setModel(data)
                    callback(data)
                    close();
                } else {
                    util.showToastWarning(res.data.data.message);
                }
            } catch (error) {
                util.showToastWarning(error.message);
            }
            
            
        };
        const addData = async () => {
            try {
                const res = await VehicleService.addVehicleModel(modelValue, type);
                console.log(res)
            if (res.data.success) {
                let data = {
                    model: modelValue,
                    type: type
                };
                util.showToastSuccess("Add successfully");
                callback(data)
            } else {
                util.showToastWarning(res.data.data.message);
            }
            } catch (error) {
                util.showToastWarning(error.message);
            }
            
            
        }
        return (
            <div>
                <div className="container bg-light p-5 rounded">
                    <div className="mb-5 ">
                        <h3>Model</h3>
                        <input className="form-control "
                            type="text"
                        value={modelValue}
                        onChange={(event)=>{setModelValue(event.target.value)}}
                        aria-label=".form-control-lg example" />
                    </div>
                    <div className="mb-5">
                        <h3>Type</h3>
                        <select
                            onChange={(event)=>{setType(event.target.value)}}
                            className="form-select form-control"
                            aria-label="Default select " >
                            {
                                types.map((value, index) => {
                                    if (model) {
                                        if (value.type === vehicleModel.type) {
                                            return (
                                                <>
                                                    <option
                                                        selected
                                                        value={value.type}
                                                        className='w-100'
                                                        
                                                    >{value.name}</option>
                                                </>
                                            )
                                        }
                                        return (
                                            <>
                                                <option
                                                    value={value.type}
                                                    className='w-100'
                                                    
                                                >{value.name}</option>
                                            </>
                                        )
                                    }
                                    
                                    return (
                                        <>
                                            <option
                                                value={value.type}
                                                className='w-100'
                                                
                                            >{value.name}</option>
                                        </>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='d-flex justify-content-around'>
                        <button type="button" className="btn btn-primary" onClick={() => {
                            model ? updateData() : addData()
                        }}>{model ? "Update" : "Add"}</button>
                        <button type="button" className="btn btn-danger"
                            onClick={close}
                        >Cancel</button>
                    </div>
                    
                </div>
                
            </div>
        )
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
                            {<PopupView
                                close = {close}
                            />}
                        </motion.div>                        
                    )
                }
            </Popup>
        </>
    )
}

export default AddUpdateVehiclePopup;