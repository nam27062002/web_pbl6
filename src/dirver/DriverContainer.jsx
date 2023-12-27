import { BrowserRouter as Router, Route } from "react-router-dom";
import HeaderDriver from "../components/header/header/HeaderDriver";
import SidebarDriver from "../components/header/sidebar/SidebarDriver";
import Profile from "../pages/Admin/profile/Profile";


const DriverContainer = () => {



    return (
        <>
            <HeaderDriver></HeaderDriver>
            <div className="d-flex">
                <SidebarDriver></SidebarDriver>
                <Route path="/" component={Profile} />
            </div>
        </>
    )
}

export default DriverContainer