import { BoxInput } from "../components/Input/BoxInput"
import HeaderLogin from "../components/header/HeaderLogin"
import '../styles/Pages/Login.css';
export const Login = () => {
    return(
        <div>
            <HeaderLogin/>
            <div className="content">
                <div className="content_left">
                    <img className="background" src="./images/background/background_login.png" alt="background"/>
                </div>
                <div className="content_right">
                    <form className="form-login">
                        <div>Welcome back, Yash</div>
                        <div>Welcome back!Please enter your details</div>
                        <BoxInput/>
                        <BoxInput/>
                        <div>error</div>
                        <div>
                            <label>
                                <input
                                type="checkbox"
                                />
                                Checkbox Label
                            </label>
                            <a>Forgot Password</a>
                        </div>
                        <button>Login</button>
                        <div>
                            You don't have an account? 
                            <a>
                                Sign up for free    
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}
  