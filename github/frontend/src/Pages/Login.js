import React, { useRef, useState } from "react";
import "./Register.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionOnLogin } from "../redux/ekart/EkartActionCreator";
import { Toast } from "primereact/toast";
import { ToastDisplay } from "../utility/ToastDisplay";

const Login = ()=>{
    const toast = useRef(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const dispatchRedux = useDispatch();
    const loginValue = useSelector((state) => state.LoginData.loggedInUser); 
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email:"",
        password:""
    });

    let name,value;
    const handleInputs = (e)=>{
        name = e.target.name;
        value = e.target.value;

        setUser({...user, [name]:value});
    }

const handleLogin = async (e,inputData) => {
    e.preventDefault();
    inputData = {
        email: user.email,
        password:user.password,
      }; 
    dispatchRedux(
        actionOnLogin(inputData, "User Logged In. Please Wait...")
      )
        .then(async (responseData) => {
          if (responseData.status == "success") {
            ToastDisplay("success", "Successful", `User Logged In Successfully.`, 200000, toast);
            setIsLoggedIn(true);
            navigate("/home"); 
          } else {
            alert(responseData.message); 
          }
        })
        .catch((error) => {
            ToastDisplay("error", "Error", "User Not Authorized", 2000, toast);
            console.error("Error occurred:", error);
        });
};
    return (
        <>
        <Toast ref={toast} />
        <section className="signup">
            <div className="container mt-5">
                <div className="signup-content">
                <div className="signup-image">
                            <figure>
                                <img src="images/login.jpg" alt="signinpic"/>
                            </figure>
                            <div className="extra-title">
                            <NavLink to="/" className='signup-image-link'>Create an Account</NavLink>
                            </div>
                        </div>
                    <div className="signup-form">
                        <h2 className="form-title">Sign in</h2>
                        <form className="register-form" id="register-form">
                            <div className="form-group">
                                <label htmlFor="email">
                                    <i class = "zmdi zmdi-email material-icons-name"></i>
                                </label>
                                <input type="email" className="custom" name="email" id="email" autoComplete="off"
                                 value={user.email}
                                 onChange={handleInputs}
                                placeholder="Email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">
                                    <i class = "zmdi zmdi-lock material-icons-name"></i>
                                </label>
                                <input type="password" className="custom" name="password" id="password" autoComplete="off"
                                 value={user.password}
                                 onChange={handleInputs}
                                placeholder="Password" />
                            </div>
                            <div className="form-group form-button">
                                <input type="submit" name="signup" id="signup" className="form-submit"
                                value="Login" onClick={handleLogin} />
                            </div>
                        </form>
                        </div> 
                </div>
            </div>
        </section>
        </>
    )
}

export default Login;