import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Admin } from "./pages/admin";
import { Home } from "./pages/home";
import { Welcome } from "./pages/Welcome";
import Contacts from "./pages/Contacts/Contacts";
import Terms from "./pages/Terms/Terms";
import About from "./pages/About/About";
import Privacy from "./pages/Privacy/Privacy";
import MethodRegister from "./pages/RegisterMethod/MethodRegister";
import HeaderLogin from "./components/header/HeaderLogin";
import ColorVehicle from "./pages/ModelVehicle/ColorVehicle";
import ModelVehicle from "./pages/ModelVehicle/ModelVehicle";
import NoInternet from "./components/no_internet/NoInternet";
import DriverHome from "./pages/DriverHome/DriverHome";
import HistoryTrip from "./pages/Driver/historytrip/HistoryTrip";
import Statistics from "./pages/Driver/statistics/Statistics";
import Profile from "./pages/Driver/profile/Profile";
import ProfileText from "./pages/Driver/profile/ProfileTest";
import SidebarDriver from "./components/header/sidebar/SidebarDriver";
// import Verify from "./pages/Driver/profile/verify/Verify";
import React, { useState, useEffect } from "react";
import "./index.css";

import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";

const App = () => {
  const [user, setUser] = useState(() => {
    const localData = JSON.parse(localStorage.getItem("user"));
    console.log(localData);
    return localData || null;
  });
  const [isAdmin, setIsAdmin] = useState(() => {
    return user ? user.user.role.some((item) => item.role === "admin") : false;
  });

  window.addEventListener("message", (event) => {
    // Kiểm tra xem thông điệp có phải là loại removeItem không
    if (event.data && event.data.action === "removeItem") {
      // Kiểm tra xem key của item cần xóa có phải là 'user' không
      if (event.data.key === "user") {
        // Thực hiện các bước xử lý khi item 'user' bị xóa
        setUser(null);
        setIsAdmin(false);
      }
    } else if (event.data && event.data.action === "checkLocalStorage") {
      if (event.data.key === "user") {
        // Thực hiện các bước xử lý khi item 'user' bị xóa
        setUser(() => {
          const localData = JSON.parse(localStorage.getItem("user"));
          setIsAdmin(() => {
            return localData.user.role.some((item) => item.role === "admin");
          });
          return localData || null;
        });
      }
    }
  });

  return (
    <div className="background">
      <Router>
        <HeaderLogin></HeaderLogin>
        <div className="header"></div>

        {/* welcome */}
        <Route path="/" exact component={Welcome} />
        <Route path="/register" component={Register} />
        <Route path="/contacts" component={Contacts}></Route>
        <Route path="/terms" component={Terms}></Route>
        <Route path="/about" component={About} />
        <Route path="/policy-privacy" component={Privacy}></Route>
        <Route path="/register-method" component={MethodRegister}></Route>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        {/* admin */}

        <Route path="/admin" component={Admin}></Route>
        <Route path="/colorVehical" component={ColorVehicle}></Route>
        <Route path="/modelVehical" component={ModelVehicle}></Route>
        {/* <Route path="/nointernet" component={NoInternet}></Route> */}
        {/* driver */}
        <div className="driver">
          {console.log(isAdmin)}
          {user && !isAdmin && <SidebarDriver></SidebarDriver>}
          <Route path="/history" component={HistoryTrip}></Route>
          <Route path="/profile" component={ProfileText}></Route>
          <Route path="/statistics" component={Statistics}></Route>
          {/* <Route path="/verify" component={Verify}></Route> */}
        </div>
      </Router>
    </div>
  );
};

export default App;
