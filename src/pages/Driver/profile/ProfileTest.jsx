import VehicleTable from "./component/vehicletable/VehicleTable";
import PersonalData from "./component/personaldata/PersonalData";
import ListItemVerify from "./component/verifycomponent/ListItemVerify";
import ToastUpdate from "./component/toast/ToastUpdate";
import React, { useState, useEffect } from 'react';
import util from "../../../util";
import "./style.css";
const ProfieText = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    return (
        
        <div className="container-profile ">
            {isOnline ? (
                <>
                    <h1 className="text-light ms-3 mt-4 ">Profile</h1>
                    <div className="display w-100">
                        <div className="column mx-4">
                            <VehicleTable></VehicleTable>
                            <div className="mt-4">
                                <ListItemVerify></ListItemVerify>
                            </div>
                        </div>
                        <div className="column ms-4 me-5 mb-4 ">
                            <PersonalData></PersonalData>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    {util.showToastWarning('Check your Internet')}
                </>
            )}
        </div>
    );
};

export default ProfieText;
