import IssueItem from "./isseitem/IssueItem"
import './style.css'
import axios from "axios"
import React, { useEffect, useState } from 'react';
import util from "../../../util";
const Issues = () => {
    const [user, setUser] = useState(() => {
        const localData = JSON.parse(localStorage.getItem("user"));
        return localData || null;
    });

    const [issues,setIssues] = useState([])
    const getAllIssues = async () => {
        if (navigator.onLine) {
            try {
                const response = await axios.get(`http://ridewizard.pro:9000/api/v1/issues?userId=${user.user.id}`, {
                headers: {
                    'Authorization': `Bearer ${user.accessToken}`,
                    'Content-Type': 'application/json',
                    }
                });
                setIssues(response.data.data)
            } catch (error) {
                util.showToastWarning(error.message);
            }
        } else {
            util.showToastWarning('Check your connection');
        }
        
    }
    useEffect(() => {
        getAllIssues();
    },[])

    return (
        <div className="container-issue px-4 pt-3">
            {issues.length>0 && issues.map((issueItem) => (
                <IssueItem
                    issue = {issueItem}
                ></IssueItem>
            ))}
        </div>
    );
}

export default Issues