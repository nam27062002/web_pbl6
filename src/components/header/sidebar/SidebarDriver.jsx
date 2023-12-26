import { useHistory, Link } from 'react-router-dom';
import './style.css';

const SidebarDriver = ({ activeItem, handleItemClick }) => {
    return (
        <div className="sidebar-container">
            <nav className="collapse d-lg-block sidebar collapse bg-white">
                <div className="position-sticky">
                    <div className="list-group list-group-flush ">
                        <a
                            href="#"
                            className={activeItem === 'Hồ sơ cá nhân' ? 'list-group-item list-group-item-action py-2 ripple active' : 'list-group-item list-group-item-action py-2 ripple'}
                            onClick={() => handleItemClick('Hồ sơ cá nhân')}
                        >
                            <img src="images/user.png" className="sidebar-icon" />Hồ sơ cá nhân
                        </a>
                        <a
                            href="#"
                            className={activeItem === 'Dịch vụ' ? 'list-group-item list-group-item-action py-2 ripple active' : 'list-group-item list-group-item-action py-2 ripple'}
                            onClick={() => handleItemClick('Dịch vụ')}
                        >
                            <img src="images/car.png" className="sidebar-icon" />Dịch vụ
                        </a>
                        <a
                            href="#"
                            className={activeItem === 'Lịch sử các cuốc xe' ? 'list-group-item list-group-item-action py-2 ripple active' : 'list-group-item list-group-item-action py-2 ripple'}
                            onClick={() => handleItemClick('Lịch sử các cuốc xe')}
                        >
                            <img src="images/file.png" className="sidebar-icon" />Lịch sử các cuốc xe
                        </a>
                        <a
                            href="#"
                            className={activeItem === 'Tài khoản và thẻ' ? 'list-group-item list-group-item-action py-2 ripple active' : 'list-group-item list-group-item-action py-2 ripple'}
                            onClick={() => handleItemClick('Tài khoản và thẻ')}
                        >
                            <img src="images/credit-card.png" className="sidebar-icon" />Tài khoản và thẻ
                        </a>
                        <a
                            href="#"
                            className={activeItem === 'Thống kê' ? 'list-group-item list-group-item-action py-2 ripple active' : 'list-group-item list-group-item-action py-2 ripple'}
                            onClick={() => handleItemClick('Thống kê')}
                        >
                            <img src="images/trend.png" className="sidebar-icon" />Thống kê
                        </a>
                        <Link
                            to="/"
                            className={activeItem === 'Thoát' ? 'list-group-item list-group-item-action py-2 ripple active' : 'list-group-item list-group-item-action py-2 ripple'}
                            onClick={() => handleItemClick('Thoát')}
                        >
                            <img src="images/power-off.png" className="sidebar-icon" />Thoát
                        </Link>
                    </div>

                </div>
            </nav>
        </div>

    );
}

export default SidebarDriver;