import React, { useEffect, useState } from 'react';
import './style.css'
import Finances from './component/finances/Finances';
import Orders from './component/order/Orders';
import HistoryOfDate from './component/order/component/historyofdate/HistoryOfDate';
import axios from 'axios';
import util from '../../../util';
import { useHistory } from "react-router-dom";
import Popup from 'reactjs-popup';


const Statistics = () => {
    const usehistory = useHistory();
    const [user, setUser] = useState(() => {
        const localData = JSON.parse(localStorage.getItem("user"));
        return localData || null;
    });
    const [dateBefore, setDateBefore] = useState(() => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 10);
        return formattedDate;
    });
    const [dateAfter, setDateAfter] = useState(() => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 10);
        return formattedDate;
    });
    const [selected, setSelected] = useState("Finances")
    const [history, setHistory] = useState([]);
    const historyDetail = async () => {
        const response = await axios.get(`http://ridewizard.pro:9000/api/v1/trips?driverID=${user.user.id}&from=${dateBefore}&to=${dateAfter}`, {
            headers: {
                'Authorization': `Bearer ${user.accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        console.log(response.data.data);
        setHistory(response.data.data)
    }
    useEffect(() => {
        if (user) {
            
            historyDetail();
        } else {
            console.log("user nu");
            usehistory.push('/')
            
        }
            

    }, [dateBefore, dateAfter]);


    return (
        <>
            {user ? (
                <div className="container-statistics">
                    <h1 className="text-light ms-4">Statistics</h1>
            
                    <div className="content-statistics">
                        <div className="px-3">
                            <button
                                onClick={() => setSelected('Finances')}
                                className={`button-statistics text-light rounded-start ${selected === "Finances" ? "selected" : ""}`}>
                                Finances
                            </button>
                            <button
                                onClick={() => setSelected('Orders')}
                                className={`button-statistics text-light rounded-end  ${selected === "Orders" ? "selected" : ""}`}>
                                Orders
                            </button>
                        </div>
                        <div className="mt-3">
                            <span className="text-light">From</span>
                            <input
                                type="date"
                                className="form-item-order"
                                max={dateAfter}
                                value={dateBefore}
                                onChange={(e) => { setDateBefore(e.target.value) }}
                            />
                            <span className="text-light">To</span>
                            <input
                                type="date"
                                className="form-item-order"
                                max={() => (new Date()).toISOString().slice(0, 10)}
                                min={dateBefore}
                                value={dateAfter}
                                onChange={(e) => { setDateAfter(e.target.value) }}
                            />
                        </div>
                        <div className="p-3">
                            {
                                selected === 'Finances' ? (
                                    <Finances
                                        dateBefore={dateBefore}
                                        dateAfter={dateAfter}
                                    ></Finances>
                                ) : (
                                    <Orders
                                        dateBefore={dateBefore}
                                        dateAfter={dateAfter}
                                    ></Orders>
                                )
                            }
                        </div>
                
                    </div>
                    {selected === 'Orders' ? (
                        <>
                            <div className="ms-4 w-device">
                                {history.length > 0 && history.map((item) => (
                                    <HistoryOfDate
                                        history={item}
                                    ></HistoryOfDate>
                            
                                ))}

                            </div>
                        </>
                    ) : (
                        <></>
                    )}
            
                </div>
            ) : (
                <>
                </>
            )}
            
        </>
    );
}

export default Statistics;