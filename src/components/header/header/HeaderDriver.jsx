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
        {/* <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button> */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {/* <a 
                href="/"
                className={selectedItem === 'home' ? 'active nav-link' : 'nav-link'}
                onClick={()=>handleSelectedItem("home")}
              >Home</a> */}
              <Link to="/"
                className={selectedItem === 'home' ? 'active nav-link' : 'nav-link'}
                onClick={() => handleSelectedItem("home")}
              >Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/about"
                className={selectedItem === 'about' ? 'active nav-link' : 'nav-link'}
                onClick={() => handleSelectedItem("about")}
              >About</Link>
            </li>
            <li className="nav-item">
              {/* <a className={selectedItem === 'terms' ? 'active nav-link' : 'nav-link'}
                onClick={()=>handleSelectedItem("terms")}
                href="/terms">Terms</a> */}
              <Link to="/terms"
                className={selectedItem === 'terms' ? 'active nav-link' : 'nav-link'}
                onClick={() => handleSelectedItem("terms")}
              >Terms</Link>
            </li>
            <li className="nav-item">
              <Link className={selectedItem === 'contacts' ? 'active nav-link' : 'nav-link'}
                onClick={() => handleSelectedItem("contacts")}
                to="/contacts">Contacts</Link>
            </li>
            <li className="nav-item">
              <Link className={selectedItem === 'policy-privacy' ? 'active nav-link' : 'nav-link'}
                onClick={() => handleSelectedItem("policy-privacy")}
                to="/policy-privacy">Policy Privacy</Link>
            </li>
            
          </ul>
          {user && (
            <button className="container-avatar" id="navbarNavDarkDropdown" onClick= {handleOnclickAvatar}>
              <ul class="navbar-nav">
                <li class="nav-item dropdown">
                  <div class="container-avatar">
                    <p className='mx-3'>{user.fullName}</p>
                    <img
                      src={user.avatar ? user.avatar : "./images/avatar/avt.png"}
                      // src='./images/avatar/avt.png'
                      className='rounded-circle avatar'
                      alt="" srcset="" />
                  </div>
                  <ul className={`dropdown-menu dropdown-menu-dark ${showDropdown?"show":""}`} aria-labelledby="navbarDarkDropdownMenuLink">
                    <li>
                      <Link></Link>
                      <a className="dropdown-item" href="#">Profie</a>
                    </li>
                    <li><a className="dropdown-item" href="#">Log out</a></li>
                    {/* <li><a className="dropdown-item" href="#">Something else here</a></li> */}
                  </ul>
                </li>
              </ul>
            </button>
            // <div class="container-avatar">
            //   <p className='mx-3'>{user.fullName }</p>
            //   <img
            //     // src={user.avatar ? user.avatar : "./image/avatar/avt.png"}
            //     src='./images/avatar/avt.png'
            //     className='rounded-circle avatar'
            //     alt="" srcset="" />
            // </div>
          )}
          
        </div>
      </div>
    </nav>
      
    
  );
}

export default HeaderDriver;