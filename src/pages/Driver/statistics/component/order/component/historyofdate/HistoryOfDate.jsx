import React, { useEffect, useState } from 'react';
import './style.css'



const HistoryOfDate = ({ history }) => {
    const [dateTrip, setDateTrip] = useState(() => {
        const dateObject = new Date(history.createdAt);
        return dateObject.getDate() + "." + (dateObject.getMonth() +1);
    });
    const [timeTrip, setTimeTrip] = useState(() => {
        const dateObject = new Date(history.createdAt);
        return dateObject.getHours() + ":" + dateObject.getMinutes();
    });
    const [fullDateTrip, setFullDateTrip] = useState(() => {
        const dateObject = new Date(history.createdAt);
        return dateObject.getDate() + "." + (dateObject.getMonth() + 1) + '.' + dateObject.getFullYear();
    });
    useEffect(() => {
        setDateTrip(() => {
            const dateObject = new Date(history.createdAt);
            return dateObject.getDate() + "." + (dateObject.getMonth() +1);
        })
        setTimeTrip(() => {
            const dateObject = new Date(history.createdAt);
            console.log(history.createdAt);
            return dateObject.getHours() + ":" + dateObject.getMinutes();
        })
        setFullDateTrip(() => {
            const dateObject = new Date(history.createdAt);
            return dateObject.getDate() + "." + (dateObject.getMonth() + 1) + '.' + dateObject.getFullYear();
        })
    },[history])
    return (
        <>
            <div className="w-100 mt-5">
                <h5 className="text-light">{dateTrip }</h5>
                <div className="content-historyofdate">
                    <div className="d-flex align-items-center">
                        <div className="me-5">
                            <span className="text-white-50 d-block">{ fullDateTrip }</span>
                            <span className="text-light d-block  ">{ timeTrip }</span>
                        </div>
                        {history.status === 'canceled' ? (
                            <h4 className="text-light ms-5">Canceled</h4>
                        ) : (
                                <div className="d-flex">
                                    <div className="mx-5">
                                        <span className="text-white-50 d-block">Commission fee</span>
                                        <span className="text-light d-block  ">${ history.fee }</span>
                                    </div>
                                    <div className="mx-5">
                                        <span className="text-white-50 d-block">Cash</span>
                                        <span className="text-light d-block  ">${ history.estFare }</span>
                                    </div>
                            </div>  
                        )}
                    </div>
                    <div className="d-flex align-items-center mt-3">
                        <div className="point-outline"></div>
                        <span className="text-light ms-2 " >{ history.pickupAddress }</span>
                    </div>
                    <div className="d-flex align-items-center mt-3">
                        <div className="point"></div>
                        <span className="text-light ms-2 " >{ history.destinationAddress }</span>
                    </div>
                </div>
                
            </div>
        </>
    );

}

export default HistoryOfDate;