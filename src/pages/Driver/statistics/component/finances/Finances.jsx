import React, { useEffect, useState } from 'react';
import './style.css'
import axios from 'axios';

const Finances = ({dateBefore, dateAfter}) => {

    const [user, setUser] = useState(() => {
        const localData = JSON.parse(localStorage.getItem("user"));
        return localData || null;
    });
    const [profit, setProfit] = useState('')
    const [fee, setFee] = useState('');
    const [ordersPrice, setOrdersPrice] = useState('');
    const handleDateChange = async () => {
        try {
            const response = await axios.get(`http://ridewizard.pro:9000/api/v1/statistic/finances?from=${dateBefore}&to=${dateAfter}`, {
                headers: {
                    'Authorization': `Bearer ${user.accessToken}`,
                    'Content-Type': 'application/json',
                }
            })
            console.log(response.data.data[0].profit);
            // setFinances(response.data.data[0])
            setProfit(response.data.data[0].profit);
            setFee(response.data.data[0].fee);
            setOrdersPrice(response.data.data[0].ordersPrice);
            // console.log(finances.profit);
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        handleDateChange();

    },[dateBefore,dateAfter]);

    return (
        <>
            <div className="finances-container">
                <div>
                    <p className="text-white-50">Profit</p>
                    <h1 className="text-light border-bottom">${profit?profit:"0"}</h1>
                    <div className="d-flex justify-content-between py-3 border-bottom">
                        <h4 className="text-light">Orders price</h4>
                        <h4 className="text-light">${ordersPrice?ordersPrice:"0"}</h4>
                    </div>
                    <div className="d-flex justify-content-between py-3 border-bottom">
                        <h4 className="text-light">Commission fee</h4>
                        <h4 className="text-light">${fee?fee:"0"}</h4>
                    </div>
                </div>
            </div>
        </>
    );
}


export default Finances;