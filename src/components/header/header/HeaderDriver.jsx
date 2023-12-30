import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../style.css'
import '../../../styles/Header/HeaderLogin.css';

const HeaderDriver = () => {

  const [openBasic, setOpenBasic] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const handleSelectedItem = (item) => {
    setSelectedItem(item)
  }
  useEffect(() => {
    const localData = localStorage.getItem('user');
    if (localData) {
      setUser(JSON.parse(localData))
    }
  }, [])
  
  const handleOnclickAvatar = () => {

    return showDropdown ? setShowDropdown(false) : setShowDropdown(true);
  }

  return (

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <img className="logo_png" src="./images/logo.png" alt="Logo" />
        <h1 className="logo_text">RideWizard</h1>
        <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
          
          {user && (
            <button className="container-avatar" id="navbarNavDarkDropdown" onClick= {handleOnclickAvatar}>
              <ul class="navbar-nav">
                <li class="nav-item dropdown">
                  <div class="container-avatar text-white">
                    <p className='mx-3 text-white'>{user.user.fullName}</p>
                    <img
                      src={user.user.avatar ? user.user.avatar : "./images/avatar/avt.png"}
                      // src='./images/avatar/avt.png'
                      className='rounded-circle avatar'
                      alt="" srcset="" />
                  </div>
                  <ul className={`dropdown-menu dropdown-menu-dark ${showDropdown?"show":""}`} aria-labelledby="navbarDarkDropdownMenuLink">
                    <li>
                      <Link to='/driver/profile' className="dropdown-item">Profie</Link>
                      {/* <a className="dropdown-item" href="#">Profie</a> */}
                    </li>
                    <li><a className="dropdown-item" href="#">Log out</a></li>
                    {/* <li><a className="dropdown-item" href="#">Something else here</a></li> */}
                  </ul>
                </li>
              </ul>
            </button>
          )}
          
        </div>
      </div>
    </nav>
      
    
  );
}

export default HeaderDriver;