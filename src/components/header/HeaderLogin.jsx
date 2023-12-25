import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Welcome } from '../../pages/Welcome'
import Contacts from '../../pages/Contacts/Contacts';
import Terms from '../../pages/Terms/Terms';
import About from '../../pages/About/About';
import Privacy from '../../pages/Privacy/Privacy';
// import {
//   MDBContainer,
//   MDBNavbar,
//   MDBNavbarBrand,
//   MDBNavbarToggler,
//   MDBIcon,
//   MDBNavbarNav,
//   MDBNavbarItem,
//   MDBNavbarLink,
//   MDBCollapse,
// } from 'mdb-react-ui-kit';
import '../../styles/Header/HeaderLogin.css';

const HeaderLogin = () => {

  const [openBasic, setOpenBasic] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const handleSelectedItem = (item) => {
    setSelectedItem(item)
  }

  return (
    // <MDBNavbar expand='lg' light bgColor='light'>
    //   <MDBContainer fluid>
    //     <MDBNavbarBrand href='/' className="header_login">
    //       <img className="logo_png" src="./images/logo.png" alt="Logo" />
    //       <h1 className="logo_text">RideWizard</h1>
    //     </MDBNavbarBrand>

    //     <MDBNavbarToggler
    //       aria-controls='navbarSupportedContent'
    //       aria-expanded='false'
    //       aria-label='Toggle navigation'
    //       onClick={() => setOpenBasic(!openBasic)}
    //     >
    //       <MDBIcon icon='bars' fas />
    //     </MDBNavbarToggler>

    //     <MDBCollapse navbar open={openBasic}>
    //       <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
    //         <MDBNavbarItem>
    //           <MDBNavbarLink
    //             className={selectedItem === 'home' ? 'active' : ''}
    //             onClick={handleSelectedItem("home")}
    //             aria-current='page' href='/'>
    //             Home
    //           </MDBNavbarLink>
    //         </MDBNavbarItem>
    //         <MDBNavbarItem>
    //           <MDBNavbarLink
    //             className={selectedItem === 'about' ? 'active' : ''}
    //             onClick={handleSelectedItem("about")}
    //             href='/about'>About</MDBNavbarLink>
    //         </MDBNavbarItem>
    //         <MDBNavbarItem>
    //           <MDBNavbarLink
    //             className={selectedItem === 'terms' ? 'active' : ''}
    //             onClick={handleSelectedItem("terms")}
    //             href='/terms'>Terms</MDBNavbarLink>
    //         </MDBNavbarItem>
    //         <MDBNavbarItem>
    //           <MDBNavbarLink
    //             className={selectedItem === 'contact' ? 'active' : ''}
    //             onClick={handleSelectedItem("contact")}
    //             href='/contacts'>Contacts</MDBNavbarLink>
    //         </MDBNavbarItem>
    //         <MDBNavbarItem>
    //           <MDBNavbarLink
    //             className={selectedItem === 'privacy' ? 'active' : ''}
    //             onClick={handleSelectedItem("privacy")}
    //             href='/policy-privacy'>Policy Privacy</MDBNavbarLink>
    //         </MDBNavbarItem>
    //       </MDBNavbarNav>
    //     </MDBCollapse>
    //   </MDBContainer>
    // </MDBNavbar>
    <Router>
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
                onClick={()=>handleSelectedItem("home")}
              >Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/about"
                className={selectedItem === 'about' ? 'active nav-link' : 'nav-link'}
                onClick={()=>handleSelectedItem("about")}
              >About</Link>
            </li>
            <li className="nav-item">
              {/* <a className={selectedItem === 'terms' ? 'active nav-link' : 'nav-link'}
                onClick={()=>handleSelectedItem("terms")}
                href="/terms">Terms</a> */}
              <Link to="/terms"
                className={selectedItem === 'terms' ? 'active nav-link' : 'nav-link'}
                onClick={()=>handleSelectedItem("terms")}
              >Terms</Link>
            </li>
            <li className="nav-item">
              <Link className={selectedItem === 'contacts' ? 'active nav-link' : 'nav-link'}
                onClick={()=>handleSelectedItem("contacts")}
                to="/contacts">Contacts</Link>
            </li>
            <li className="nav-item">
              <Link className={selectedItem === 'policy-privacy' ? 'active nav-link' : 'nav-link'}
                onClick={()=>handleSelectedItem("policy-privacy")}
                to="/policy-privacy">Policy Privacy</Link>
            </li>
            
          </ul>
        </div>
      </div>
      </nav>
      <Route path='/contacts' component={Contacts}></Route>
        <Route path="/" exact component={Welcome} />
        <Route path='/terms' component={ Terms}></Route>
      <Route path='/about' component={About} />
      <Route path='/policy-privacy' component={Privacy}></Route>
    </Router>
    
  );
}

export default HeaderLogin;