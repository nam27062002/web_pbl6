import React from 'react';

const Sidebar = ({ activeItem, handleItemClick }) => {
    return (
        <div className="collapse d-lg-block sidebar collapse sidebar-container fixed-bottom">
            <ul className="sidebar-list">
                <li>
                    <a href="#" className={activeItem === 'Account' ? 'active ' : ''} onClick={() => handleItemClick('Account')}>
                        <img src="images/user.png" className="sidebar-icon" />
                        <span className="text-light">Account</span> 
                        
                    </a>
                </li>
                <li>
                    <a href="#" className={activeItem === 'Drivers' ? 'active' : ''} onClick={() => handleItemClick('Drivers')}>
                        <img src="images/driver.png" className="sidebar-icon" />
                        <span className="text-light">Drivers</span> 
                    </a>
                </li>
                <li>
                    <a href="#" className={activeItem === 'Help Desk' ? 'active' : ''} onClick={() => handleItemClick('Help Desk')}>
                        <img src="images/support.png" className="sidebar-icon" />
                        <span className="text-light">Help Desk</span> 
                    </a>
                </li>
                <li>
                    <a href="#" className={activeItem === 'Create Promo' ? 'active' : ''} onClick={() => handleItemClick('Create Promo')}>
                        <img src="images/voucher.png" className="sidebar-icon" />
                        <span className="text-light">Create Promo</span> 
                    </a>
                </li>
            </ul>
        </div>
    );
}
export default Sidebar;