import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Admin } from './pages/admin';
import { Home } from './pages/home';
import { Welcome } from './pages/Welcome';
import Contacts from './pages/Contacts/Contacts';
import Terms from './pages/Terms/Terms';
import About from './pages/About/About';
import Privacy from './pages/Privacy/Privacy';
import MethodRegister from './pages/RegisterMethod/MethodRegister';
import HeaderLogin from "./components/header/HeaderLogin"
import ColorVehicle from './pages/ModelVehicle/ColorVehicle';
import ModelVehicle from './pages/ModelVehicle/ModelVehicle';

import './index.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className="background">
      <HeaderLogin></HeaderLogin>
      <Router>
        <Route path="/" exact component={Welcome} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register}/>
        <Route path="/home" component={Home} />
        <Route path="/admin" component={Admin} />
        <Route path='/contacts' component={Contacts }></Route>
        <Route path='/terms' component={ Terms}></Route>
        <Route path='/about' component={ About} />
        <Route path='/policy-privacy' component={Privacy}></Route>
        <Route path='/register-method' component={MethodRegister}></Route>
        <Route path='/colorVehical' component={ColorVehicle}></Route>
        <Route path='/modelVehical' component={ModelVehicle }></Route>
      </Router>
    </div>
    
  );
}

export default App;