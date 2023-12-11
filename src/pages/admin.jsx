import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory, Link } from 'react-router-dom';
const Avatar = ({ src, alt, size }) => {

    return (
      <img
        className={`avatar ${size ? `avatar-${size}` : ''}`}
        src={src}
        alt={alt}
      />
    );
};

export const Admin = () => {
    const [activeItem, setActiveItem] = useState('Account');
    const handleItemClick = (itemName) => {
        setActiveItem(itemName);
    };
    return(
        <div>
            <header className="header_home">
                <img className="logo_png" src="./images/logo.png" alt="Logo" />
                <h1 className="logo_text">RideWizard</h1>
                <div className="box_avt">
                    <div className="info_user">
                    <div className="name_user">ADMIN</div>
                    </div>
                    <Avatar src="/images/avatar/avt.png" alt="User Avatar" size="small" />
                </div>
            </header>
            <div className="content">
                <div className="sidebar-collapse">
                    <ul className="sidebar-list">
                        <li>
                            <a
                                href="#"
                                className={activeItem === 'Account' ? 'active' : ''}
                                onClick={() => handleItemClick('Account')}
                            >
                                 <img src="images/user.png" className="sidebar-icon"/>Account
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className={activeItem === 'Drivers' ? 'active' : ''}
                                onClick={() => handleItemClick('Drivers')}
                            >
                                <img src="images/car.png" className="sidebar-icon"/>Drivers
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <ToastContainer />
        </div>
        
    )
}