import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import DriverContentHeader from './driver/DriverContentHeader';
import WelcomeContentHeader from './welcome/WelcomeContentHeader';
import './style.css'

const HeaderLogin = () => {

  const [openBasic, setOpenBasic] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [user, setUser] = useState(() => {
    const localData = JSON.parse(localStorage.getItem('user'));
    return localData || null
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);


  const handleSelectedItem = (item) => {
    setSelectedItem(item)
  }
  // useEffect(() => {
  //   const localData = localStorage.getItem('user');
  //   if (localData) {
  //     setUser(JSON.parse(localData))
  //   }
  // }, [])
  
  const handleOnclickAvatar = () => {

    return showDropdown ? setShowDropdown(false) : setShowDropdown(true);
  }

  window.addEventListener('message', event => {
    // Kiểm tra xem thông điệp có phải là loại removeItem không
    if (event.data && event.data.action === 'removeItem') {
      // Kiểm tra xem key của item cần xóa có phải là 'user' không
      if (event.data.key === 'user') {
        // Thực hiện các bước xử lý khi item 'user' bị xóa
        setUser(null);
        setIsAdmin(false);
      }
    } else if (event.data && event.data.action === 'checkLocalStorage') {
      if (event.data.key === 'user') {
        // Thực hiện các bước xử lý khi item 'user' bị xóa
        setUser(() => {
          const localData = JSON.parse(localStorage.getItem('user'));
          return localData || null
        });
        setIsAdmin(() => {
          const localData = JSON.parse(localStorage.getItem('user'));
          return localData.user.role.some((item) => item.role === "admin");
        });
      }
    }
  });
  useEffect(() => {
    console.log(isAdmin);
  })

  return (

    <nav className="navbar navbar-expand-lg fixed-top bg-nav">
      <div className="container-fluid">
        <div className="d-flex">
          <img className="logo_png" src="./images/logo.png" alt="Logo" />
        <h1 className="logo_text">RideWizard</h1>
        </div>
        
        {
          user ? (
            <DriverContentHeader
            ></DriverContentHeader>
          ) : (
              <WelcomeContentHeader></WelcomeContentHeader>
          )
        }
        
      </div>
    </nav>
  );
}

export default HeaderLogin;