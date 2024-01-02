import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../styles/Pages/Register.css";
import axios from "axios";
import util from '../util';
import Lottie from "lottie-react";
import groovyWalkAnimation from "../lotti/driver_banner.json";
import Spinner from "../components/spinner/Spinner";
import NoInternet from "../components/no_internet/NoInternet";

export const Register = (props) => {
  const [countdown, setCountdown] = useState(60);
  const [token, setToken] = useState(
    props.location.state && props.location.state.tokenToSet
      ? props.location.state.tokenToSet
      : "null"
  );
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [inputValue, setInputValue] = useState(
    props.location.state && props.location.state.inputValueToSet
      ? props.location.state.inputValueToSet
      : ""
  );
  const [runCountdown, setRunCountdown] = useState(
    props.location.state && props.location.state.runCountdownToSet
      ? props.location.state.runCountdownToSet
      : false
  );
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [contentType, setContentType] = useState(
    props.location.state && props.location.state.contentTypeToSet
      ? props.location.state.contentTypeToSet
      : "personalInfo"
  );
  const history = useHistory();
  const [selectedType, setSelectedType] = useState(null);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [licensePlate, setLicensePlate] = useState("");
  const [selectedModelId, setSelectedModelId] = useState(null);
  const [selectedColorId, setSelectedColorId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const becomeToDriver = async (token) => {
    if (navigator.onLine) {
      setIsOnline(true);
      try {
        setLoading(true);
        const response = await axios.get(
          "http://ridewizard.pro:9000/api/v1/drivers/drive",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setIsOnline(false);
    }
  };

  const updateProfile = async (data) => {
    if (navigator.onLine) {
      setIsOnline(true);
      try {
        setLoading(true);
        const url = `http://ridewizard.pro:9000/api/v1/users/profile/${data.data.user.id}`;
        const authorizationHeader = `Bearer ${data.data.accessToken}`;
        const response = await axios.put(
          url,
          {
            firstName: lastName,
            lastName: firstName,
            dob: dob,
            address: selectedProvince,
            avatar: "",
          },
          {
            headers: {
              Authorization: authorizationHeader,
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setIsOnline(false);
    }
  };
  useEffect(() => {
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

    fetchData();
  }, []);
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const years = Array.from(
      { length: currentYear - 1999 },
      (_, i) => currentYear - i
    );
    setYears(years);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      if (navigator.onLine) {
        setIsOnline(true);
        try {
          setLoading(true);
          const modelsResponse = await axios.get(
            "http://ridewizard.pro:9000/api/v1/vehicle/models",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const colorsResponse = await axios.get(
            "http://ridewizard.pro:9000/api/v1/vehicle/colors"
          );

          setModels(modelsResponse.data.data.models);
          setColors(colorsResponse.data.data.colors);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setIsOnline(false);
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
    if (runCountdown) {
      requestOTP(token);
    }
  }, [runCountdown]);
  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };
  const handleModelChange = (e) => {
    const selectedModel = models.find(
      (model) => model.model === e.target.value
    );
    setSelectedModelId(selectedModel ? selectedModel.id : null);
  };

  const handleColorChange = (e) => {
    const selectedColor = colors.find(
      (color) => color.color === e.target.value
    );
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
    console.log(selectedValue);
  };
  const handleClickBackButton = () => {
    history.push("/");
  };
  const handleClickBackButton1 = () => {
    setContentType("personalInfo");
  };
  const handleClickBackButton2 = () => {
    setContentType("confirmOTP");
  };

  const handleClicContinueButton = () => {
    if (!firstName || !lastName || !gender || !dob || !email || !password) {
      setError("Please enter complete information");
      return;
    }
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();

    if (age < 18) {
      setError("You must be 18 years or older to register.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email.");
      return;
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(.{8,})$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must have at least 8 characters, 1 capital letter and 1 special character."
      );
      return;
    }

    setError("");
    setContentType("verify");
  };

  const handleClicContinueButton1 = async () => {
    if (navigator.onLine) {
      setIsOnline(true);
      try {
        setLoading(true);
        const response = await fetch(
          "http://ridewizard.pro:9000/api/v1/users/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              fullName: firstName + " " + lastName,
              email: email,
              phNo: inputValue,
              password: password,
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message);
          throw new Error("Signup failed");
        }
        util.showToastSuccess("Successfully")
        const data = await response.json();
        console.log(data);
        updateProfile(data);
        // becomeToDriver(data.data.accessToken);
        requestOTP(data.data.accessToken);
        setToken(data.data.accessToken);
        setContentType("confirmOTP");
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
        console.error("Error calling API:", error.message);
        util.showToastWarning('Fail call API')
      } finally {
        setLoading(false);
      }
    } else {
      setIsOnline(false);
      util.showToastWarning('No internet')

    }
  };

  const handleClickContinueButton = async () => {
    if (!selectedModelId || !selectedColorId || !licensePlate) {
      setError("Please enter complete information");
    } else {
      setError("");
      if (navigator.onLine) {
        setIsOnline(true);
        try {
          setLoading(true);
          const response = await axios.post(
            "http://ridewizard.pro:9000/api/v1/drivers/vehicle",
            {
              modelId: selectedModelId,
              MfgYear: "2017",
              colorId: selectedColorId,
              licensePlate,
              active: "",
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log("API Response:", response.data);
          setPopupOpen(true);
        } catch (error) {
          setError("Error unable to register");
          console.error("Error calling API:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setIsOnline(false);
        util.showToastWarning('No internet')
      }
    }
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const requestOTP = async (token) => {
    if (navigator.onLine) {
      setIsOnline(true);
      try {
        setLoading(true);
        const response = await axios.get(
          "http://ridewizard.pro:9000/api/v1/auth/otp/phone",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setIsOnline(false);
    }
  };

  const verifyOTP = async (token, otp) => {
    if (navigator.onLine) {
      setIsOnline(true);
      try {
        setLoading(true);
        const response = await axios.post(
          "http://ridewizard.pro:9000/api/v1/auth/otp/phone/verify",
          {
            otp: otp,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setError("");
        setContentType("vehicleInformation");
      } catch (error) {
        setError("OTP code is incorrect");
        console.error("Error verifying OTP:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setIsOnline(false);
    }
  };

  const handleInputChange2 = (e) => {
    const inputText = e.target.value.replace(/\D/g, "");
    if (inputText.length <= 6) {
      if (inputText.length == 6) {
        verifyOTP(token, inputText);
      }
      setOtp(inputText);
    }
  };

  const renderContent = () => {
    if (contentType === "verify") {
      return (
        <div className="content_left ">
          <div className="C_T_1">REGISTER</div>
          <div className="C_T_2">START EARN INCOME TODAY</div>
          <div className="C_T_3">
            No need to go to the office or talk to staff. After filling
            application, you will receive a username and password to log in to the application
            use. And can already start making money!
          </div>
          <select
            class="selection_province-register "
            id="provinceSelect"
            value={selectedProvince}
            onChange={handleProvinceChange}>
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
            placeholder="Phone number"
          />
          <div className="error">{error}</div>
          <div className="form_button">
            <button className="back-btn" onClick={handleClickBackButton1}>
              BACK
            </button>
            <button className="signup-btn" onClick={handleClicContinueButton1}>
              CONTINUE
            </button>
          </div>
        </div>
      );
    }
    if (contentType === "personalInfo") {
      return (
        <div className="content_left">
          <div className="form_title_1">PERSONAL INFORMATION</div>
          <input
            className="input_phonenumber"
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            className="input_phonenumber"
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <select
            className="selection_gender"
            onChange={handleGenderChange}
            value={gender}>
            <option value="" disabled hidden>
              Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input
            className="input_phonenumber"
            type="date"
            placeholder="Birthday"
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
            <button className="back-btn" onClick={handleClickBackButton}>
              QUAY LẠI
            </button>
            <button className="signup-btn" onClick={handleClicContinueButton}>
              TIẾP THEO
            </button>
          </div>
        </div>
      );
    }
    if (contentType === "confirmOTP") {
      return (
        <div className="content_left1">
          <div
            className="back"
            onClick={() => {
              setContentType("verify");
            }}>
            <div className="arrow_left">&lt;</div>
            <div className="text_btn">BACK</div>
          </div>
          <div className="A1">
            The message containing the code has been sent to email
          </div>
          <div className="A2">
            +84 {inputValue.slice(1, 4)} {inputValue.slice(4, 7)}{" "}
            {inputValue.slice(7)}
          </div>
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
            {countdown > 0
              ? `You can request to resend the code after 0:${countdown < 10 ? `0${countdown}` : countdown
              }`
              : "Request to resend the code"}
          </div>
        </div>
      );
    }
    if (contentType === "vehicleInformation") {
      return (
        <div className="content_left">
          <div>TRANSPORTATION INFORMATION</div>
          <select
            className="selection_province-register "
            onChange={handleTypeChange}>
            <option disabled hidden selected>
              Type of vehicle
            </option>
            <option value="car">Car</option>
            <option value="motorcycles">Motorcycles</option>
          </select>
          <select
            className="selection_province-register "
            onChange={handleModelChange}>
            <option disabled hidden selected>
              Brand
            </option>
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
          <select
            className="selection_province-register "
            onChange={(e) => setSelectedYear(e.target.value)}>
            <option disabled hidden selected>
              Year of manufacture
            </option>
            {years.map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>
          <select
            className="selection_province-register "
            onChange={handleColorChange}>
            <option disabled hidden selected>
              Color
            </option>
            {colors.map((color) => (
              <option key={color.id} value={color.color}>
                {color.color}
              </option>
            ))}
          </select>
          <input
            className="input_phonenumber"
            type="text"
            placeholder="License plates. For example: 43A12345"
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value)}
          />
          <div className="error">{error}</div>
          <div className="form_button">
            <button className="back-btn" onClick={handleClickBackButton2}>
              QUAY LẠI
            </button>
            <button className="signup-btn" onClick={handleClickContinueButton}>
              TIẾP THEO
            </button>
          </div>
        </div>
      );
    }
  };
  const closePopup = () => {
    setPopupOpen(false);
  };
  const handleConfirm = () => {
    closePopup();
    history.push({
      pathname: "/",
    });
  };

  const handleCancel = () => {
    closePopup();
  };
  return (
    <div className="d-flex justify-content-center ">
      {isOnline ? (
        <div className="content-register">
          {loading && (
            <div className="overlay d-flex align-items-center justify-content-center">
              <Spinner />
            </div>
          )}
          {renderContent()}
          <div className="content_right d-flex justify-content-center">
            {/* <img className="background" src="./images/register/background.png" alt="background"/> */}
            <Lottie
              animationData={groovyWalkAnimation}
              loop={true}
              className="banner"
            />
          </div>
        </div>
      ) : (
        <div className="content-register">
          <NoInternet />
          {util.showToastWarning("Check your connection")}
        </div>
      )}

      <div className="pop-up">
        {isPopupOpen && (
          <div className="popup-overlay">
            <div className="popup">
              <p>Registration successful, please log in to use the service</p>
              <div className="button-container">
                <button onClick={handleConfirm} className="btn_confirm">
                  CONFIRM
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
