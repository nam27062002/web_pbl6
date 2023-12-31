import React, { useState, useEffect } from "react"
import axios from "axios";
import util from "../../../../../util";

const ChangePassword = ({ close,noti,isSuccess }) => {
    const [user, setUser] = useState(() => {
        const localData = JSON.parse(localStorage.getItem("user"));
        return localData || null;
      });
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const changePw = async () => {
        try {
            const url = `http://ridewizard.pro:9000/api/v1/users/change-password`;
            const authorizationHeader = `Bearer ${user.accessToken}`;
            const response = await axios.put(
                url,
                {
                    currentPassword: oldPassword,
                    newPassword: newPassword,
                },
                {
                    headers: {
                        Authorization: authorizationHeader,
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.status === 200) {
                noti(true)
                isSuccess(true)
                close()
            } else {
                noti(true)
                isSuccess(false)
            }
        } catch (error) {
            noti(true)
            isSuccess(false)
        } 
    };

    return (
        <>
            <div className="Personal-container p-4">
                <div className="">
                    <label htmlFor="A14" className="text-light">
                        New password
                    </label>
                    <input
                        type="text"
                        className="form-item"
                        id="A14"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div className="">
                    <label htmlFor="A14" className="text-light">
                        Old password
                    </label>
                    <input
                        type="text"
                        className="form-item"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </div>
                <div className="d-flex justify-content-around">
                    <button className="button-style text-light"
                        onClick={changePw}
                    >
                        Confirm
                    </button>
                    <button className="button-style text-light"
                        onClick={close}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
}


export default ChangePassword;