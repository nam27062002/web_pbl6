import util from "../../../../util";
import "./style.css";
import moment from 'moment';

const IssueItem = ({issue}) => {

    return (
        <div className="pb-4">
            <div className="d-flex">
            <h5 className="text-white-50">Subject: </h5>
            <h5 className="text-light ms-2">{issue.subject} </h5>
            </div>
            <div className="content-issue">
                <div>
                    <h5 className={`${issue.status === "Resolved" ? "text-success" : "text-warning"}`}>{issue.status}</h5>
                    
                    <h5 className="text-white-50">Description:</h5>
                    <span className="text-light">{issue.description}</span>
                </div>
                <div>
                    <h5 className="text-white-50">Resolution:</h5>
                    <span className="text-light">{issue.resolution}</span>
                </div>
                <div className="d-flex justify-content-between">
                <div>
                        <h5 className="text-white-50">createdAt</h5>
                        <span className="text-light">{moment(issue.createdAt).format("DD/MM/YYYY HH:mm")}</span>
                </div>
                <div>
                        <h5 className="text-white-50">updatedAt</h5>
                        <span className="text-light">{moment(issue.updatedAt).format("DD/MM/YYYY HH:mm")}</span>
                </div>
                </div>
                
            </div>
            
        </div>
    );
}


export default IssueItem;