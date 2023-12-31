import React, { useState, useEffect } from 'react';
import axios from 'axios';
import util from '../../../../util';
const PopupIssue = ({ pickUpPoint, destinationPoint, id }) => {
    const [user, setUser] = useState(() => {
        const localData = JSON.parse(localStorage.getItem("user"));
        return localData || null;
      });
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    
    
    const getIssue = async () => {
        const response = await axios.get(`http://ridewizard.pro:9000/api/v1/issues/issue?id=${id}`)
    }
    const handleSendIssue = async () => {
        if (navigator.onLine) {
            try {
                console.log(subject);
                console.log(message);
                console.log(user.accessToken);
                const response = await axios.post(`http://ridewizard.pro:9000/api/v1/issues/`,
                    {
                    subject: subject,
                    description: message
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${user.accessToken}`,
                            'Content-Type': 'application/json',
                        },
                    
                    })

                console.log(response);
                if (response.data.status === 201) {
                    util.showToastSuccess(response.data.message);
                } else {
                    util.showToastWarning(response.data.message);
                    return;
                }
            } catch (error) {
                console.log(error.message);
                util.showToastWarning(error.message);
            }
        } else {
            util.showToastWarning("Check your connection")
        }
        
    };

   




    return (
        <>
            
            <div className="Personal-container p-4">
                <h3 className="text-light">Feed back</h3>
                <div className="">
                    <label htmlFor="A14" className="text-light">
                        Pick up point:
                        <br></br>  {pickUpPoint}
                    </label>
                </div>
                <div className="">
                    <label htmlFor="A14" className="text-light">
                        Destination: <br></br> {destinationPoint}
                    </label>
                </div>
                <div className="">
                    <label htmlFor="A14" className="text-light">
                        Subject
                    </label>
                    <input
                        onChange={e => setSubject(e.target.value)}
                        type="text"
                        className="form-item"
                    />
                </div>
                <div className="">
                    <label htmlFor="A14" className="text-light">
                        Message
                    </label>
                    <textarea
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        className="form-item"
                    />
                </div>
                <div className="d-flex justify-content-around">
                    <button className="button-style text-light px-5"
                        onClick={handleSendIssue}
                    >
                        Send
                    </button>
                    <button className="button-style text-light px-5"
                    >
                        Cancel
                    </button>
                </div>
            </div>
                   
        </>
    );
}

export default PopupIssue;