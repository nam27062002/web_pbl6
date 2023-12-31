import './style.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HistoryOfDate from './component/historyofdate/HistoryOfDate';
import util from '../../../../../util';


const Orders = ({dateBefore,dateAfter}) => {

    const [user, setUser] = useState(() => {
        const localData = JSON.parse(localStorage.getItem("user"));
        return localData || null;
    });
    const [canceled, setCanceled] = useState();
    const [complete, setComplete] = useState();
    const [totalDistance, setTotalDistance] = useState('');

    const handleDateChange = async () => {
        try {
            const response = await axios.get(`http://ridewizard.pro:9000/api/v1/statistic/orders?from=${dateBefore}&to=${dateAfter}`, {
                headers: {
                    'Authorization': `Bearer ${user.accessToken}`,
                    'Content-Type': 'application/json',
                }
            })
            setCanceled(response.data.data.canceled)
            setComplete(response.data.data.completed);
            setTotalDistance(() => response.data.data.totalDistance);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        handleDateChange();
    },[dateBefore,dateAfter])




    return (
        <>
            
            <div className="container-order">
                <div className="mt-3 d-flex py-4">
                    <div className="w-50 w-phone">
                        <span className="text-white-50">Complete</span>
                        <h3 className="text-light">{complete||"0"}</h3>
                    </div>
                    <div className="w-50">
                        <span className="text-white-50">Canceled</span>
                        <h3 className="text-light">{canceled||"0"}</h3>
                    </div>
                </div>
                <div className="d-flex justify-content-between py-4 border-top">
                    <h5 className="text-light">Orders mileage</h5>
                    <h5 className="text-light">{totalDistance?totalDistance:"0"} km.</h5>
                </div>
            </div>
        </>
    );
}


export default Orders;