import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Admin } from './pages/admin';
import { Home } from './pages/home';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const App = () => {
  return (
    <Router>
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register}/>
        <Route path="/home" component={Home} />
        <Route path="/admin" component={Admin} />
    </Router>
  );
}

export default App;