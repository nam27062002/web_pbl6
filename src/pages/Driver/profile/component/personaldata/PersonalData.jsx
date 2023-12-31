import './style.css'
import React, {useState, useEffect} from 'react'
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Popup from 'reactjs-popup';
import ChangePassword from './ChangePassword';
import util from '../../../../../util';

const PersonalData = () => {
    const [user, setUser] = useState(() => {
        const localData = JSON.parse(localStorage.getItem("user"));
        return localData || null;
      });
    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [error, setError] = useState("");
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [provinces, setProvinces] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [loading, setLoading] = useState(false);
    const [isOnline, setIsOnline] = useState(true);
    const [showMessage, setShowMessage] = useState(false);

    const fetchData = async () => {
        if (navigator.onLine) {
            setIsOnline(true);
            try {
                setLoading(true);
                const response = await fetch(
                    "https://provinces.open-api.vn/api/?depth=3"
                );
  
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                
                const data = await response.json();

                let provinceNames = data.map((province) => province.name);
                provinceNames = provinceNames.map((name) =>
                    name.replace("Tỉnh ", "").replace("Thành phố ", "")
                );
                provinceNames.sort((a, b) => a.localeCompare(b));
                setProvinces(provinceNames);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        } else {
            setIsOnline(false);
        }
    };
    const getProfile = async () => {
        if (navigator.onLine) {
          setIsOnline(true);
          try {
            setLoading(true);
            const response = await axios.get(
              `http://ridewizard.pro:9000/api/v1/users/${user.user.id}`,
              {
                headers: {
                  Authorization: `Bearer ${user.accessToken}`,
                },
              }
            );
            setEmail(response.data.data.user.email);
            setPhoneNumber(response.data.data.user.phNo);
            setFullName(response.data.data.user.fullName);
            setDateOfBirth(response.data.data.user.dob.split("T")[0]);
            setSelectedProvince(response.data.data.user.address);
          } catch (error) {
          } finally {
            setLoading(false);
          }
        } else {
          setIsOnline(false);
        }
    };

    const handleProvinceChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedProvince(selectedValue);
    };

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const handleEditClick = (event) => {
        if (!isEdit) {
            setIsEdit(true)
        } else {
            const today = new Date();
            const birthDate = new Date(dateOfBirth);
            const age = today.getFullYear() - birthDate.getFullYear();
            if (age < 18) {
                setError("Chưa đủ tuổi để sử dụng");
                return;
            }
            if (fullName === '') {
                setError('Your name is null')
            }
            updateProfile();
            setIsEdit(false);
        }
    };

    const updateProfile = async () => {
        if (navigator.onLine) {
            setIsOnline(true);
            try {
                setLoading(true);
                const url = `http://ridewizard.pro:9000/api/v1/users/profile/${user.user.id}`;
                const authorizationHeader = `Bearer ${user.accessToken}`;
                const response = await axios.put(
                    url,
                    {
                        fullName: fullName,
                        dob: dateOfBirth,
                        address: selectedProvince,
                    },
                    {
                        headers: {
                            Authorization: authorizationHeader,
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (response.status !== 200) {
                    util.showToastWarning(response.data.message)
                } else {
                    util.showToastSuccess(response.data.message)
                }
                console.log(response);
              
            } catch (error) {
                console.error("Error fetching data:", error);
                util.showToastWarning(error.message)
                return
            } finally {
                setLoading(false);
            }
        } else {
            setIsOnline(false);
            util.showToastWarning("Check your connection")
        }
    };
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const popupContentStyle = {
        width: windowWidth < 768 ? '85%' : '40%', 
        height: 'auto',
        padding: '0px',
        background: "rgba(255, 255, 255, 0)",
        borderRadius: '12px',
        boxShadow: "none"
    };
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };
    useEffect(() => {
        fetchData();
        getProfile();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (

        <div className="Personal-container">
            <h4 className="text-light w-100 border-1 border-bottom border-light px-3 py-3">Personal Data</h4>
            <div className="mx-4 pt-2 pb-3">
                <div className="">
                    <label htmlFor="A11" className="text-light">
                        Full Name
                    </label>
                    <input
                        type="text"
                        className="form-item"
                        id="A11"
                        value={fullName}
                        readOnly={!isEdit}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
                <div className="">
                    <label htmlFor="A12" className="text-light">
                        Gender
                    </label>
                    <select
                        className="form-item"
                        onChange={handleGenderChange}
                        value={gender}
                        disabled={true}
                    >
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                    </select>
                </div>
                <div className="">
                    <label htmlFor="A13" className="text-light">
                        Date of Birth
                    </label>
                    <input
                        type="date"
                        className="form-item"
                        id="A13"
                        value={dateOfBirth}
                        readOnly={!isEdit}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                    />
                </div>
                <div className="">
                    <label htmlFor="A13" className="text-light">
                        Address
                    </label>
                    <select
                        className="form-item"
                        id="provinceSelect"
                        value={selectedProvince}
                        disabled={!isEdit}
                        onChange={handleProvinceChange}>
                        {provinces.map((province) => (
                            <option key={province} value={province}>
                                {province}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="">
                    <label htmlFor="A14" className="text-light">
                        Email
                    </label>
                    <input
                        type="text"
                        className="form-item"
                        id="A14"
                        value={email}
                        readOnly={true}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="">
                    <label htmlFor="A15" className="text-light">
                        Phone Number
                    </label>
                    <input
                        type="text"
                        className="form-item"
                        id="A15"
                        value={phoneNumber}
                        readOnly={true}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
            </div>
            <div className="d-flex justify-content-between px-4 pb-3">
                <button
                    onClick={handleEditClick}
                    className="button-style text-light px-5">
                    {!isEdit ? "EDIT" : "Complete"}
                </button>
                
                <Popup
                    trigger={
                        <button className="button-style text-light">
                            Change password
                        </button>
                                        
                    }
                    modal nested
                    contentStyle={popupContentStyle}
                >
                    {
                        close => (
                            <>
                                <ChangePassword
                                    close={close}
                                ></ChangePassword>
                            </>
                        )
                    }
                </Popup>
            </div>
        </div>
            

    );

}

export default PersonalData;