import '../styles/Pages/Home.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

export const Home = (props) => {
    const history = useHistory();
    const [gender, setGender] = useState('');
    const [error, setError] = useState('');
    const [error1, setError1] = useState('');
    const [fullName, setFullName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [activeItem, setActiveItem] = useState('Hồ sơ cá nhân');
    const [isEditing, setIsEditing] = useState(false);
    const [dob, setDob] = useState('');
    const [provinces, setProvinces] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(''); 
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
    const handleProvinceChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedProvince(selectedValue);
        console.log(selectedValue)
      };
    const [isPopupChangePasswordOpen, setIsPopupChangePasswordOpen] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    
    const handleOldPasswordChange = (e) => {
        setOldPassword(e.target.value);
    };
    
    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };
    const handleOpenPopupChangePassword = () => {
        setIsPopupChangePasswordOpen(true);
    };
    
    const handleConfirmPasswordChange = (e) => {
        setConfirmNewPassword(e.target.value);
    };
    const onClose = () => {
        setIsPopupChangePasswordOpen(false);
    };
    const changePw = async (oldPassword,newPassword) => {
        try {
            const url = `http://ridewizard.pro:9000/api/v1/users/change-password`;
            const authorizationHeader = `Bearer ${accessToken}`;
            const response = await axios.put(
                url,
                {
                    currentPassword: oldPassword,
                    newPassword: newPassword,
                },
                {
                headers: {
                    Authorization: authorizationHeader,
                    'Content-Type': 'application/json',
                },
                }
            );
            setIsPopupChangePasswordOpen(false);
            toast.success('Cập nhật mật khẩu thành công', { autoClose: 1000 });
            setTimeout(() => {
          history.push("/");
        }, 1000);
        } catch (error) {
            
            setError1("Mật khẩu không chính xác");
        }
    };
    const handleSubmit = () => {
        if (oldPassword && newPassword && confirmNewPassword && newPassword === confirmNewPassword) {
            // TODO: kiểm tra xem mật khẩu mới có hợp lệ
            setError1("");
            changePw(oldPassword,newPassword);

        } else {
        setError1('Invalid passwords or passwords do not match');
        }
    };
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://provinces.open-api.vn/api/?depth=3');
    
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            let provinceNames = data.map(province => province.name);
            provinceNames = provinceNames.map(name => name.replace('Tỉnh ', '').replace('Thành phố ', '')); 
            provinceNames.sort((a, b) => a.localeCompare(b));
            setProvinces(provinceNames);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);
    const handleSaveClick = () => {
        const today = new Date();
        const birthDate = new Date(dob);
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 18){
            setError("Chưa đủ tuổi để sử dụng")
            return;
        }
        if (firstName === ''){
            setError("Vui lòng nhập tên")
            return;
        }
        if (lastName === ''){
            setError("Vui lòng nhập họ")
            return;
        }
        updateProfile();
    setIsEditing(false);
    };
    const updateProfile = async () => {
        try {
          const url = `http://ridewizard.pro:9000/api/v1/users/profile/${userId}`;
          const authorizationHeader = `Bearer ${accessToken}`;
          const response = await axios.put(
            url,
            {
              firstName: firstName,
              lastName: lastName,
              dob: dob,
              address: selectedProvince,
              avatar: ""
            },
            {
              headers: {
                Authorization: authorizationHeader,
                'Content-Type': 'application/json',
              },
            }
          );
    
          toast.success('Hồ sơ được cập nhật thành công!', { autoClose: 3000 });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://ridewizard.pro:9000/api/v1/users/${userId}`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
            if (!response.data.data.lastName) {
                setFullName(response.data.data.user.firstName);
                
            } else {
                setFullName(response.data.data.user.lastName + " " + response.data.data.user.firstName);
            }
            setEmail(response.data.data.user.email);
            setPhonenumber(response.data.data.user.phNo);
            setLastName(response.data.data.user.lastName);
            setFirstName(response.data.data.user.firstName);
            setDob(response.data.data.user.dob.split('T')[0]);
            setSelectedProvince(response.data.data.user.address);
          } catch (error) {
          }
        };
      
        fetchData(); 
      }, []);
    return(
        <div>
            {/* <header className="header_home">
                <div className='d-flex align-items-center'>
                    <img className="logo_png" src="./images/logo.png" alt="Logo" />
                    <h1 className="logo_text">RideWizard</h1>
                </div>
                
                <div className="box_avt">
                    <div className="info_user">
                    <div className="name_user">{fullName}</div>
                        <div className="address_user">Đà Nẵng</div>
                    </div>
                    <Avatar src="/images/avatar/avt.png" alt="User Avatar" size="small" />
                </div>
            </header> */}
            <div className="content">
                <nav className="collapse d-lg-block sidebar collapse bg-white">
                    <div className="position-sticky">
                        <div className="list-group list-group-flush ">
                            <a
                                href="#"
                                className={activeItem === 'Hồ sơ cá nhân' ? 'list-group-item list-group-item-action py-2 ripple active' : 'list-group-item list-group-item-action py-2 ripple'}
                                onClick={() => handleItemClick('Hồ sơ cá nhân')}
                            >
                                 <img src="images/user.png" className="sidebar-icon"/>Hồ sơ cá nhân
                            </a>
                            <a
                                href="#"
                                className={activeItem === 'Dịch vụ' ? 'list-group-item list-group-item-action py-2 ripple active' : 'list-group-item list-group-item-action py-2 ripple'}
                                onClick={() => handleItemClick('Dịch vụ')}
                            >
                                <img src="images/car.png" className="sidebar-icon"/>Dịch vụ
                            </a>
                            <a
                                href="#"
                                className={activeItem === 'Lịch sử các cuốc xe' ? 'list-group-item list-group-item-action py-2 ripple active' : 'list-group-item list-group-item-action py-2 ripple'}
                                onClick={() => handleItemClick('Lịch sử các cuốc xe')}
                            >
                                <img src="images/file.png" className="sidebar-icon"/>Lịch sử các cuốc xe
                            </a>
                            <a
                                href="#"
                                className={activeItem === 'Tài khoản và thẻ' ? 'list-group-item list-group-item-action py-2 ripple active' : 'list-group-item list-group-item-action py-2 ripple'}
                                onClick={() => handleItemClick('Tài khoản và thẻ')}
                            >
                                <img src="images/credit-card.png" className="sidebar-icon"/>Tài khoản và thẻ
                            </a>
                            <a
                                href="#"
                                className={activeItem === 'Thống kê' ? 'list-group-item list-group-item-action py-2 ripple active' : 'list-group-item list-group-item-action py-2 ripple'}
                                onClick={() => handleItemClick('Thống kê')}
                            >
                                <img src="images/trend.png" className="sidebar-icon"/>Thống kê
                            </a>
                            <Link
                                to="/"
                                className={activeItem === 'Thoát' ? 'list-group-item list-group-item-action py-2 ripple active' : 'list-group-item list-group-item-action py-2 ripple'}
                                onClick={() => handleItemClick('Thoát')}
                            >
                                <img src="images/power-off.png" className="sidebar-icon"/>Thoát
                            </Link>
                        </div>
                        
                    </div>
                </nav>
                <div className="content_1">
                    <div className='T1'>Hồ sơ cá nhân</div>
                    <div className="A1">
                        <div className="L1">
                            <div className='A2'>Phương tiện</div>
                            <div className="scroll_x">
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
                            </div>
                            
                            <button className='btn_A1'>Thêm loại xe khác</button>
                        </div>
                        <div className='R1'>
                            <div className='A2'>Dữ liệu cá nhân</div>
                            <div className='A111'>
                                <label htmlFor="A11" className='A112'>Họ</label>
                                <input
                                type='text'
                                className='form-control'
                                id='A11'
                                value={lastName}
                                readOnly={!isEditing}
                                onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                            <div className='A111'>
                                <label htmlFor="A11" className='A112'>Tên</label>
                                <input
                                type='text'
                                className='form-control'
                                id='A11'
                                value={firstName}
                                readOnly={!isEditing}
                                onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className='A111'>
                                <label htmlFor="A12" className='A112'>Giới tính</label>
                                <select
                                className="selection_gender1"
                                onChange={handleGenderChange}
                                value={gender}
                                disabled={true}
                                >
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                                </select>
                            </div>
                            <div className='A111'>
                                <label htmlFor="A13" className='A112'>Ngày sinh</label>
                                <input
                                type='date'
                                className='form-control'
                                id='A13'
                                value={dob}
                                readOnly={!isEditing}
                                onChange={(e) => setDob(e.target.value)}
                                />
                            </div>
                            <div className='A111'>
                                <label htmlFor="A13" className='A112'>Địa chỉ</label>
                                <select 
                                class="selection_province" 
                                id="provinceSelect" 
                                value={selectedProvince} 
                                disabled={!isEditing}
                                onChange={handleProvinceChange}>
                                {provinces.map((province) => (
                                    <option key={province} value={province}>
                                    {province}
                                    </option>
                                ))}
                            </select>
                            </div>
                            
                            <div className='A111'>
                                <label htmlFor="A14" className='A112'>Email</label>
                                <input
                                type='text'
                                className='form-control'
                                id='A14'
                                value={email}
                                readOnly={true}
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
                                readOnly={true}
                                onChange={(e) => setPhonenumber(e.target.value)}
                                />
                            </div>
                            
                            <div className='error'>{error}</div>
                            <div className='btn_AAA'>
                                <button
                                className='btn_A22'
                                onClick={isEditing ? handleSaveClick : handleEditClick}
                                >
                                {isEditing ? 'Lưu chỉnh sửa' : 'Chỉnh sửa'}
                                </button>
                                <button className='btn_A2' onClick={handleOpenPopupChangePassword}>Thay đổi mật khẩu</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
            {isPopupChangePasswordOpen && (
                <div className="popup-container">
                    <div className="popup-content">
                    <h2>Đổi mật khẩu</h2>
                    <label className='lb'>
                        Mật khẩu cũ
                        <input
                        className='ip'
                        type="password"
                        value={oldPassword}
                        onChange={handleOldPasswordChange}
                        />
                    </label>
                    <label className='lb'>
                        Mật khẩu mới
                        <input
                        className='ip'
                        type="password"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                        />
                    </label>
                    <label className='lb'>
                        Nhập lại mật khẩu mới
                        <input
                        className='ip'
                        type="password"
                        value={confirmNewPassword}
                        onChange={handleConfirmPasswordChange}
                        />
                    </label>
                    <div className='error' id='error_change_pw'>{error1}</div>
                    <div className="button-container">
                        <button onClick={handleSubmit} className="btn_confirm">Xác nhận</button>
                        <button onClick={onClose} className="btn_cancel">Hủy</button>
                    </div>
                    </div>
                </div>
                )}
        </div>
        
    )
}