import React, { useState, useEffect } from 'react';
import VehicleService from '../../service/VehicleService';
const VehiclePopup = ({vehicle, callback }) => {
    const [colorText, setColorText] = useState("")
    const [colorDes,setColorDes]  = useState("")
    const handleClickUpdateColor = async () => {
        console.log(colorText);
        const res = await VehicleService.updateVehicleColor(vehicle.id, colorText, colorDes)
        if (res.data.success) {
            let newData = {
                id : vehicle.id,
                color: colorText,
                des: colorDes
            }
            // console.log(newData);
            callback(newData)
        }
    }
    const handleAddColor = async () => {
        const res = await VehicleService.addVehicleColor(colorText, colorDes)
        console.log(res);
        if (res.data.success) {
            let newData = {
                color: colorText,
                des: colorDes
            }
            callback(newData)
        }
    }

    useEffect(() => {
        if (vehicle) {
            setColorText(vehicle.color)
            setColorDes(vehicle.des)            
        }

    },[])

    return (

        <div>
            <div className="container bg-light p-5 rounded">
                <div className="mb-5 ">
                    <h3>Color</h3>
                    <input className="form-control form-control-lg" type="text"
                        value={colorText}
                        onChange={(event)=>{setColorText(event.target.value)}}
                        aria-label=".form-control-lg example" />
                </div>
                <div className="mb-5">
                    <h3>Description</h3>
                    <input className="form-control form-control-lg"
                        value={colorDes}
                        onChange={(event)=>{setColorDes(event.target.value)}}
                        type="text" aria-label=".form-control-lg example" />
                </div>
                <div className='d-flex justify-content-around'>
                    <button type="button" className="btn btn-primary" onClick={() => {
                        vehicle?handleClickUpdateColor():handleAddColor()
                    }}>{vehicle?"Update":"Add"}</button>
                    <button type="button" className="btn btn-danger">Cancel</button>
                </div>
                
            </div>
            
        </div>
    );
}

export default VehiclePopup;