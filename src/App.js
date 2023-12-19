import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Admin } from './pages/admin';
import { Home } from './pages/home';
import { Welcome } from './pages/Welcome';
import Contacts from './pages/Contacts/Contacts';
import Terms from './pages/Terms/Terms';
import About from './pages/About/About';
import Privacy from './pages/Privacy/Privacy';
import HeaderLogin from "./components/header/HeaderLogin"

import './index.css';

import { BrowserRouter as Router, Route, Link, Switch  } from 'react-router-dom';

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
        <Route path='/policy-privacy' component={ Privacy}></Route>
      </Router>
    </div>
    
  );
}

export default App;