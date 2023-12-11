import '../styles/Pages/Home.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Avatar = ({ src, alt, size }) => {

    return (
      <img
        className={`avatar ${size ? `avatar-${size}` : ''}`}
        src={src}
        alt={alt}
      />
    );
};

export const Home = (props) => {
    const [gender, setGender] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [activeItem, setActiveItem] = useState('Hồ sơ cá nhân');
    const [isEditing, setIsEditing] = useState(false);
    const [userId, setUserId] = useState(
        props.location.state && props.location.state.userIdToSet
          ? props.location.state.userIdToSet
          : ""
      );
    const [accessToken, setAccessToken] = useState(
        props.location.state && props.location.state.accessTokenToSet
          ? props.location.state.accessTokenToSet
          : ""
      );
    const handleItemClick = (itemName) => {
        setActiveItem(itemName);
    };
    const handleEditClick = () => {
        setIsEditing(!isEditing);
      };
    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };
    const handleSaveClick = () => {
    // Thêm logic để xử lý khi nhấn nút "Lưu chỉnh sửa"
    alert('Đã lưu chỉnh sửa');
    setIsEditing(false);
    };
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://ridewizard.pro:9000/api/v1/users/${userId}`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
            setFullName(response.data.data.user.fullName);
            setEmail(response.data.data.user.email);
            setPhonenumber(response.data.data.user.phNo);
          } catch (error) {
          }
        };
      
        fetchData(); 
      }, []);
    return(
        <div>
            <header className="header_home">
                <img className="logo_png" src="./images/logo.png" alt="Logo" />
                <h1 className="logo_text">RideWizard</h1>
                <div className="box_avt">
                    <div className="info_user">
                    <div className="name_user">{fullName}</div>
                        <div className="address_user">Đà Nẵng</div>
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
                                className={activeItem === 'Hồ sơ cá nhân' ? 'active' : ''}
                                onClick={() => handleItemClick('Hồ sơ cá nhân')}
                            >
                                 <img src="images/user.png" className="sidebar-icon"/>Hồ sơ cá nhân
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className={activeItem === 'Dịch vụ' ? 'active' : ''}
                                onClick={() => handleItemClick('Dịch vụ')}
                            >
                                <img src="images/car.png" className="sidebar-icon"/>Dịch vụ
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className={activeItem === 'Lịch sử các cuốc xe' ? 'active' : ''}
                                onClick={() => handleItemClick('Lịch sử các cuốc xe')}
                            >
                                <img src="images/file.png" className="sidebar-icon"/>Lịch sử các cuốc xe
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className={activeItem === 'Tài khoản và thẻ' ? 'active' : ''}
                                onClick={() => handleItemClick('Tài khoản và thẻ')}
                            >
                                <img src="images/credit-card.png" className="sidebar-icon"/>Tài khoản và thẻ
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className={activeItem === 'Thống kê' ? 'active' : ''}
                                onClick={() => handleItemClick('Thống kê')}
                            >
                                <img src="images/trend.png" className="sidebar-icon"/>Thống kê
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className={activeItem === 'Thoát' ? 'active' : ''}
                                onClick={() => handleItemClick('Thoát')}
                            >
                                <img src="images/power-off.png" className="sidebar-icon"/>Thoát
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="content_1">
                    <div className='T1'>Hồ sơ cá nhân</div>
                    <div className="A1">
                        <div className="L1">
                            <div className='A2'>Phương tiện</div>
                            <table className="custom-table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Hãng</th>
                                        <th>Hạng</th>
                                        <th>Số</th>
                                        <th>Năm</th>
                                        <th>Màu</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><button class="delete-button"><img src="./images/bin.png" alt="Xóa"/></button></td>
                                        <td>Xe máy</td>
                                        <td>Xe máy</td>
                                        <td>73H111999</td>
                                        <td>2012</td>
                                        <td>Đỏ</td>
                                    </tr>
                                </tbody>
                            </table>
                            <button className='btn_A1'>Thêm loại xe khác</button>
                        </div>
                        <div className='R1'>
                            <div className='A2'>Dữ liệu cá nhân</div>
                            <div className='A111'>
                                <label htmlFor="A11" className='A112'>Họ tên</label>
                                <input
                                type='text'
                                className='form-control'
                                id='A11'
                                value={fullName}
                                readOnly={!isEditing}
                                onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>
                            <div className='A111'>
                                <label htmlFor="A12" className='A112'>Giới tính</label>
                                <select
                                className="selection_gender1"
                                onChange={handleGenderChange}
                                value={gender}
                                disabled={!isEditing}
                                >
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                                </select>
                            </div>
                            <div className='A111'>
                                <label htmlFor="A13" className='A112'>Ngày sinh</label>
                                <input
                                type='text'
                                className='form-control'
                                id='A13'
                                value="27/06/2002" 
                                readOnly={!isEditing}
                                />
                            </div>
                            <div className='A111'>
                                <label htmlFor="A14" className='A112'>Email</label>
                                <input
                                type='text'
                                className='form-control'
                                id='A14'
                                value={email}
                                readOnly={!isEditing}
                                onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className='A111'>
                                <label htmlFor="A15" className='A112'>Số điện thoại</label>
                                <input
                                type='text'
                                className='form-control'
                                id='A15'
                                value={phonenumber}
                                readOnly={!isEditing}
                                onChange={(e) => setPhonenumber(e.target.value)}
                                />
                            </div>
                            <div className='btn_AAA'>
                                <button
                                className='btn_A22'
                                onClick={isEditing ? handleSaveClick : handleEditClick}
                                >
                                {isEditing ? 'Lưu chỉnh sửa' : 'Chỉnh sửa'}
                                </button>
                                <button className='btn_A2'>Thay đổi mật khẩu</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}