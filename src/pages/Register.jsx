import HeaderLogin from "../components/header/HeaderLogin"
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/Pages/Register.css';
import axios from 'axios';
export const Register = (props) => {
    const [countdown, setCountdown] = useState(60);
    const [token, setToken] = useState(
      props.location.state && props.location.state.tokenToSet
        ? props.location.state.tokenToSet
        : 'null'
    );
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [provinces, setProvinces] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(''); 
    const [selectedGender, setSelectedGender] = useState('');
    const [inputValue, setInputValue] = useState(
      props.location.state && props.location.state.inputValueToSet
        ? props.location.state.inputValueToSet
        : ''
    );
    const [runCountdown, setRunCountdown] = useState(
      props.location.state && props.location.state.runCountdownToSet
        ? props.location.state.runCountdownToSet
        : false
    );
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [otp, setOtp] = useState('');
    const [contentType, setContentType] = useState(
      props.location.state && props.location.state.contentTypeToSet
        ? props.location.state.contentTypeToSet
        : 'personalInfo'
    );
    const history = useHistory();
    const [selectedType, setSelectedType] = useState(null);
    const [models, setModels] = useState([]);
    const [years, setYears] = useState([]);
    const [colors, setColors] = useState([]);
    const [selectedModel, setSelectedModel] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [licensePlate, setLicensePlate] = useState('');
    const [selectedModelId, setSelectedModelId] = useState(null);
    const [selectedColorId, setSelectedColorId] = useState(null);
    const becomeToDriver = async (token) => {
        try {
          const response = await axios.get('http://ridewizard.pro:9000/api/v1/drivers/drive', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          console.log(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };

    const updateProfile = async (data) => {
      try {
        const url = `http://ridewizard.pro:9000/api/v1/users/profile/${data.data.user.id}`;
        const authorizationHeader = `Bearer ${data.data.accessToken}`;
        const response = await axios.put(
          url,
          {
            firstName: lastName,
            lastName: firstName,
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
  
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
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
    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const years = Array.from({length: currentYear - 1999}, (_, i) => currentYear - i);
        setYears(years);
    }, []);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const modelsResponse = await axios.get('http://ridewizard.pro:9000/api/v1/vehicle/models');
            const colorsResponse = await axios.get('http://ridewizard.pro:9000/api/v1/vehicle/colors');
    
            setModels(modelsResponse.data.data.models);
            setColors(colorsResponse.data.data.colors);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

    useEffect(() => {
      let timer;
  
      if (runCountdown && countdown > 0) {
        timer = setInterval(() => {
          setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);
      }
  
      return () => {
        clearInterval(timer);
      };
    }, [runCountdown, countdown]);

    useEffect(() => {
      if (runCountdown){
        requestOTP(token);
      }
    }, [runCountdown]);
    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
    };
    const handleModelChange = (e) => {
        const selectedModel = models.find((model) => model.model === e.target.value);
        setSelectedModelId(selectedModel ? selectedModel.id : null);
    };
    
    const handleColorChange = (e) => {
    const selectedColor = colors.find((color) => color.color === e.target.value);
    setSelectedColorId(selectedColor ? selectedColor.id : null);
    };

    const handleInputChange = (e) => {
      const value = e.target.value;
      if (!isNaN(value)) {
        setInputValue(value);
      }
    };
    const handleProvinceChange = (event) => {
      const selectedValue = event.target.value;
      setSelectedProvince(selectedValue);
      console.log(selectedValue)
    };
    const handleClickBackButton = () => {
    
        history.push('/');
    };
    const handleClickBackButton1 = () => {
    
        setContentType('personalInfo');
    };
    const handleClickBackButton2 = () => {
    
        setContentType('confirmOTP');
    };

    const handleClicContinueButton = () =>{
        if (!firstName || !lastName || !gender || !dob || !email || !password) {
            setError('Vui lòng nhập đầy đủ thông tin.');
            return;
        }
        const birthDate = new Date(dob);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();

        if (age < 18) {
        setError('Bạn phải đủ 18 tuổi trở lên để đăng ký.');
        return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
        setError('Vui lòng nhập email hợp lệ.');
        return;
        }
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(.{8,})$/;
        if (!passwordRegex.test(password)) {
            setError('Mật khẩu phải có ít nhất 8 kí tự, 1 chữ cái in hoa và 1 kí tự đặc biệt.');
            return;
        }

        setError('');
        setContentType('verify');
    }
    
    const handleClicContinueButton1 = async () =>{
        try {
            const response = await fetch('http://ridewizard.pro:9000/api/v1/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName: firstName + " "+lastName, 
                    email: email,
                    phNo: inputValue,
                    password: password
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message);
                throw new Error('Signup failed');
            }

            const data = await response.json();
            console.log(data);
            updateProfile(data);
            becomeToDriver(data.data.accessToken);
            requestOTP(data.data.accessToken);
            setToken(data.data.accessToken);
            setContentType('confirmOTP');
            let timer;
            if (countdown > 0) {
                timer = setInterval(() => {
                  setCountdown((prevCountdown) => prevCountdown - 1);
                }, 1000);
              }
          
              return () => {
                clearInterval(timer);
              };
        } catch (error) {
            console.error('Error calling API:', error.message);
        }
       
    }

    const handleClickContinueButton = async () => {
        if (!selectedModelId || !selectedColorId || !licensePlate) {
          setError('Vui lòng nhập đầy đủ thông tin');
        } else {
          setError('');
          try {
            const response = await axios.post(
              'http://ridewizard.pro:9000/api/v1/drivers/vehicle',
              {
                modelId: selectedModelId,
                MfgYear: '2017',
                colorId: selectedColorId,
                licensePlate,
                active: '',
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
    
            console.log('API Response:', response.data);
            setPopupOpen(true);
          } catch (error) {
            setError("Lỗi không thể đăng kí");
            console.error('Error calling API:', error);
          }
        }
      };
    
    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };
    
    const requestOTP = async (token) => {
        try {
          const response = await axios.get('http://ridewizard.pro:9000/api/v1/auth/otp/phone', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };

    const verifyOTP = async (token, otp) => {
        try {
          const response = await axios.post('http://ridewizard.pro:9000/api/v1/auth/otp/phone/verify', {
            otp: otp,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response.data);
          setError("");
          setContentType("vehicleInformation");
        } catch (error) {
            setError("Mã OTP không chính xác");
            console.error('Error verifying OTP:', error);
        }
      
    };

    const handleInputChange2 = (e) => {
        const inputText = e.target.value.replace(/\D/g, '');
        if (inputText.length <= 6) {
            if (inputText.length == 6){
                verifyOTP(token,inputText);
            }
            setOtp(inputText);
        }
    };

    const renderContent = () => {
        if (contentType === 'verify') {
          return (
            <div className="content_left">
                <div className="C_T_1">ĐĂNG KÝ</div>
                <div className="C_T_2">HÃY BẮT ĐẦU KIẾM THU NHẬP TỪ HÔM NAY</div>
                <div className="C_T_3">Không cần đến văn phòng hay nói chuyện với nhân viên. Sau khi điền đơn, bạn sẽ nhận được tên đăng nhập và mật khẩu để đăng nhập vào ứng dụng. Và đã có thể bắt đầu kiếm tiền!</div>
                <select class="selection_province" id="provinceSelect" value={selectedProvince} onChange={handleProvinceChange}>
                    {provinces.map((province) => (
                        <option key={province} value={province}>
                        {province}
                        </option>
                    ))}
                </select>
                <input
                className="input_phonenumber"
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Số điện thoại"
                />
                <div className="error">{error}</div>
                <div className="form_button">
                    <button className="back-btn" onClick={handleClickBackButton1}>QUAY LẠI</button>
                    <button className="signup-btn" onClick={handleClicContinueButton1}>TIẾP THEO</button> 
                </div>
            </div>
          );
        }
        if (contentType === 'personalInfo'){
            return (
                <div className="content_left">
                      <div className="form_title_1">THÔNG TIN CÁ NHÂN</div>
                      <input
                          className="input_phonenumber"
                          type="text"
                          placeholder="Họ"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                      />
                      <input
                          className="input_phonenumber"
                          type="text"
                          placeholder="Tên"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                      />
                      <select className="selection_gender" onChange={handleGenderChange} value={gender}>
                          <option value="" disabled hidden>Giới tính</option>
                          <option value="male">Nam</option>
                          <option value="female">Nữ</option>
                      </select>
                      <input
                          className="input_phonenumber"
                          type="date"
                          placeholder="Ngày sinh"
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                      />
                      <input
                          className="input_phonenumber"
                          type="text"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                      />
                      <input
                          className="input_phonenumber"
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                      />
                      <div className="error">{error}</div>
                      <div className="form_button">
                          <button className="back-btn" onClick={handleClickBackButton}>QUAY LẠI</button>
                          <button className="signup-btn" onClick={handleClicContinueButton}>TIẾP THEO</button>
                      </div>
                </div>
              );
        }
        if (contentType === 'confirmOTP'){
            return (
                <div className="content_left1">
                    <div className="back" onClick={() => {setContentType("verify")}}>
                        <div className="arrow_left">&lt;</div>
                        <div className="text_btn">QUAY LẠI</div>
                    </div>
                    <div className="A1">Tin nhắn chứa mã đã được gửi đến số điện thoại</div>
                    <div className="A2">+84 {inputValue.slice(1, 4)} {inputValue.slice(4, 7)} {inputValue.slice(7)}</div>
                    <input
                    className="input_phonenumber"
                    id="input_otp"
                    type="text"
                    placeholder="OTP"
                    value={otp}
                    onChange={handleInputChange2}
                    />
                    <div className="error">{error}</div>

                    <div className="countdown">
                        {countdown > 0 ? (
                            `Bạn có thể yêu cầu gửi lại mã sau 0:${countdown < 10 ? `0${countdown}` : countdown}`
                        ) : (
                            'Yêu cầu gửi lại mã'
                        )}
                    </div>
                </div>
            )
        }
        if (contentType === 'vehicleInformation'){
            return (
                <div className="content_left">
                    <div>THÔNG TIN PHƯƠNG TIỆN</div>
                    <select className="selection_province" onChange={handleTypeChange}>
                        <option disabled hidden selected>Loại</option>
                        <option value="Car">Xe ô tô</option>
                        <option value="truck">Xe tải</option>
                        <option value="Motorcycles">Xe máy</option>
                    </select>
                    <select className="selection_province" onChange={handleModelChange}>
                        <option disabled hidden selected>Hãng</option>
                        {selectedType
                        ? models
                            .filter((model) => model.type === selectedType)
                            .map((model) => (
                                <option key={model.id} value={model.model}>
                                {model.model}
                                </option>
                            ))
                        : models.map((model) => (
                            <option key={model.id} value={model.model}>
                                {model.model}
                            </option>
                            ))}
                    </select>
                    <select className="selection_province" onChange={(e) => setSelectedYear(e.target.value)}>
                        <option disabled hidden selected>Năm sản xuất</option>
                        {years.map(year => <option key={year}>{year}</option>)}
                    </select>
                    <select className="selection_province" onChange={handleColorChange}>
                        <option disabled hidden selected>Màu</option>
                        {colors.map((color) => (
                        <option key={color.id} value={color.color}>
                            {color.color}
                        </option>
                        ))}
                    </select>
                    <input
                        className="input_phonenumber"
                            type="text"
                            placeholder="Biển số xe. Ví dụ: 43A12345"
                            value={licensePlate}
                            onChange={(e) => setLicensePlate(e.target.value)}
                        />
                    <div className="error">{error}</div>
                    <div className="form_button">
                        <button className="back-btn" onClick={handleClickBackButton2}>QUAY LẠI</button>
                        <button className="signup-btn" onClick={handleClickContinueButton}>TIẾP THEO</button> 
                    </div>
                </div>
            )
        }
    };
    const closePopup = () => {
      setPopupOpen(false);
    };
    const handleConfirm = () => {
      closePopup();
      history.push(
          {
              pathname: '/',
          }
        );
    };
  
    const handleCancel = () => {
      closePopup();
    }
    return (
      <div>
            <HeaderLogin/>
            <div className="content">
                {renderContent()}
                <div className="content_right">
                    <img className="background" src="./images/register/background.png" alt="background"/>
                </div>
            </div>
            <div className="pop-up">
                {isPopupOpen && (
                    <div className="popup-overlay">
                        <div className="popup">
                            <p>Đăng kí thành công, vui lòng đăng nhập để sử dụng dịch vụ</p>
                            <div className="button-container">
                            <button onClick={handleConfirm} className="btn_confirm">Xác nhận</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
      </div>
    );
}