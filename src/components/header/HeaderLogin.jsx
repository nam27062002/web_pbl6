import React from 'react';
import '../../styles/Header/HeaderLogin.css';

const HeaderLogin = () => {
  return (
    <header className="header_login">
      <img className="logo_png" src="./images/logo.png" alt="Logo" />
      <h1 className="logo_text">RideWizard</h1>
    </header>
  );
};

export default HeaderLogin;