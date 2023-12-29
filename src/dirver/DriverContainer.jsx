import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HeaderDriver from "../components/header/header/HeaderDriver";
import SidebarDriver from "../components/header/sidebar/SidebarDriver";
import Profile from "../pages/Driver/profile/Profile";
import HistoryTrip from "../pages/Driver/historytrip/HistoryTrip";

const DriverContainer = () => {
  return (
    <>
      <HistoryTrip></HistoryTrip>
    </>
  );
};

export default DriverContainer;
