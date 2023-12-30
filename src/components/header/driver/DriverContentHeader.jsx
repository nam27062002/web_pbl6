import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../style.css'
import '../../../styles/Header/HeaderLogin.css';


const DriverContentHeader = () => {
  const [user, setUser] = useState(() => {
    const localData = JSON.parse(localStorage.getItem('user'));
    console.log(localData);
    return localData || null
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const handleOnclickAvatar = () => {

    return showDropdown ? setShowDropdown(false) : setShowDropdown(true);
  }
  const handleLogOut = () => {
    localStorage.removeItem('user');
    window.postMessage({ action: 'removeItem', key: 'user' }, '*');
  }
    
  return (
    <>
      {user && (
        <button className="container-avatar" id="navbarNavDarkDropdown" onClick={handleOnclickAvatar}>
          <ul class="navbar-nav">
            <li class="nav-item dropdown">
              <div class="container-avatar">
                <p className='mx-3 text-white'>{user.user.fullName}</p>
                <img
                  src={user.user.avatar ? user.user.avatar : "./images/avatar/avt.png"}
                  // src='./images/avatar/avt.png'
                  className='rounded-circle avatar'
                  alt="" srcset="" />
              </div>
              <ul className={`dropdown-menu dropdown-menu-dark ${showDropdown ? "show" : ""}`} aria-labelledby="navbarDarkDropdownMenuLink">
                <li>
                  <Link to='/profile' className="dropdown-item">Profie</Link>
                  {/* <a className="dropdown-item" href="#">Profie</a> */}
                </li>
                <li>
                  <Link to="/" onClick={handleLogOut} className="dropdown-item">Log out </Link>
                  {/* <a className="dropdown-item" href="#">Log out</a> */}
                </li>
                {/* <li><a className="dropdown-item" href="#">Something else here</a></li> */}
              </ul>
            </li>
          </ul>
        </button>
      )}
    </>
  )
}


export default DriverContentHeader