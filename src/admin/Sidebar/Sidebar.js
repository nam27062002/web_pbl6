import React from 'react';
import './style.css'
const Sidebar = ({ activeItem, handleItemClick }) => {
    return (
        <div className="collapse d-lg-block sidebar collapse sidebar-container fixed-bottom">
            <ul className="list-unstyled">
                <li className="">
                    <a href="#" className={activeItem === 'Account' ? 'active_item sidebar-link text-white ' : 'sidebar-link text-white '} onClick={() => handleItemClick('Account')}>
                        <img src="images/user.png" className="sidebar-icon" />
                        <span className="text-light">Account</span> 
                        
                    </a>
                </li>
                <li>
                    <a href="#" className={activeItem === 'Drivers' ? 'active_item sidebar-link text-white ' : ' sidebar-link text-white '} onClick={() => handleItemClick('Drivers')}>
                        <img src="images/driver.png" className="sidebar-icon" />
                        <span className="text-light">Drivers</span> 
                    </a>
                </li>
                <li>
                    <a href="#" className={activeItem === 'Help Desk' ? 'active_item sidebar-link text-white ' : 'sidebar-link text-white '} onClick={() => handleItemClick('Help Desk')}>
                        <img src="images/support.png" className="sidebar-icon" />
                        <span className="text-light">Help Desk</span> 
                    </a>
                </li>
                <li>
                    <a href="#" className={activeItem === 'Create Promo' ? 'active_item sidebar-link text-white ' : 'sidebar-link text-white '} onClick={() => handleItemClick('Create Promo')}>
                        <img src="images/voucher.png" className="sidebar-icon" />
                        <span className="text-light">Create Promo</span> 
                    </a>
                </li>
                <li>
                    <a href="#" className={activeItem === 'Color Vehicle' ? 'active_item sidebar-link text-white ' : 'sidebar-link text-white '} onClick={() => handleItemClick('Color Vehicle')}>
                        <img src="images/voucher.png" className="sidebar-icon" />
                        <span className="text-light">Color Vehicle</span> 
                    </a>
                </li>
                <li>
                    <a href="#" className={activeItem === 'Model Vehicle' ? 'active_item sidebar-link text-white ' : 'sidebar-link text-white '} onClick={() => handleItemClick('Model Vehicle')}>
                        <img src="images/voucher.png" className="sidebar-icon" />
                        <span className="text-light">Model Vehicle</span> 
                    </a>
                </li>
            </ul>
        </div>
    );
}
export default Sidebar;