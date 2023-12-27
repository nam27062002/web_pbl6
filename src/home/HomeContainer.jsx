import HeaderLogin from "../components/header/HeaderLogin";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Welcome } from "../pages/Welcome";
import Contacts from "../pages/Contacts/Contacts";
import Terms from "../pages/Terms/Terms";
import About from "../pages/About/About";
import Privacy from "../pages/Privacy/Privacy";
import MethodRegister from "../pages/RegisterMethod/MethodRegister";
import DriverContainer from "../dirver/DriverContainer";
import { BrowserRouter as Router, Route, Switch  } from "react-router-dom";
const HomeContainer = () => {



    return (
        <>
                {/* <Route path="/dirver" component={DriverContainer} /> */}
                
                <HeaderLogin></HeaderLogin>
                <Route path="/" exact component={Welcome} />
                <Route path="/register" component={Register} />
                <Route path="/contacts" component={Contacts}></Route>
                <Route path="/terms" component={Terms}></Route>
                <Route path="/about" component={About} />
                <Route path="/policy-privacy" component={Privacy}></Route>
                <Route path="/register-method" component={MethodRegister}></Route>
            

        </>
    )

}

export default HomeContainer