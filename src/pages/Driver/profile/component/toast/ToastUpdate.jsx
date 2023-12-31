import { Toast,ToastContainer } from 'react-bootstrap';
import React, {useState, useEffect} from 'react';
import './style.css'
import util from '../../../../../util';



const ToastUpdate = ({res,isSuccess,setMessage}) => {
    const [show, setShow] = useState(false);
    const toggleToast = () => {
        setShow(false);
    }
    useEffect(() => {
        setShow(res);
        if (res) {
            setTimeout(() => {
                setShow(false);
                setMessage(false)
            }, 1000);
        }
    },[res])
    return (
        <>
            <ToastContainer position="bottom-end" className='position-fixed mb-3 me-2 '
                
                role="alert" aria-live="assertive" aria-atomic="true">
                <Toast show={show} onClose={toggleToast}>
                    <Toast.Header>
                        <div className={`noti rounded me-3 ${isSuccess?'bg-success':'bg-danger'}`}></div>
                    <strong className="me-auto">Update</strong>
                </Toast.Header>
                    <Toast.Body >
                        {isSuccess ? (
                            <span className="text-success">Success</span>
                        ) : (
                            <span className="text-danger">Update fail</span>
                        )}
                    </Toast.Body>
            </Toast>
            </ToastContainer>
            
        </>
    );
}

export default ToastUpdate;