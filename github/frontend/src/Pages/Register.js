import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Register.css";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { actionOnRegister } from "../redux/ekart/EkartActionCreator";

const Register = () => {
  const navigate = useNavigate();
  const dispatchRedux = useDispatch();

    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });

    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value });
    }

    const handleRegistration = async (e,inputData) => {
        e.preventDefault();  
        inputData = {
            name: user.name,
            email: user.email,
            phone: user.phone,
            password:user.password,
            confirmPassword: user.confirmPassword
          }; 
        dispatchRedux(
            actionOnRegister(inputData, "User Registered. Please Wait...")
          )
            .then(async (responseData) => {
              if (responseData.status == "success") {
                alert('User registered successfully.')
                navigate('/login'); 
              } else {
                alert("User already Exist or You have entered wrong information!")
                console.error('Registration failed:', responseData.error);
              }
            })
            .catch((error) => {
                alert("error", "Error", "Error in Registered the User");
              console.log(error);
            });
    };
  
    return (
        <>
            <section className="signup">
                <div className="container mt-5">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Sign up</h2>
                            <form method="POST" className="register-form" id="register-form">
                                <div className="form-group">
                                    <label htmlFor="name">
                                        <i class="zmdi zmdi-account material-icons-name"></i>
                                    </label>
                                    <input type="text" className="custom" name="name" id="name" autoComplete="off"
                                        value={user.name}
                                        onChange={handleInputs}
                                        placeholder="Name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">
                                        <i class="zmdi zmdi-email material-icons-name"></i>
                                    </label>
                                    <input type="email" className="custom" name="email" id="email" autoComplete="off"
                                        value={user.email}
                                        onChange={handleInputs}
                                        placeholder="Email" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">
                                        <i class="zmdi zmdi-phone-in-talk material-icons-name"></i>
                                    </label>
                                    <input type="number" className="custom" name="phone" id="phone" autoComplete="off"
                                        value={user.phone}
                                        onChange={handleInputs}
                                        placeholder="Phone" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">
                                        <i class="zmdi zmdi-lock material-icons-name"></i>
                                    </label>
                                    <input type="password" className="custom" name="password" id="password" autoComplete="off"
                                        value={user.password}
                                        onChange={handleInputs}
                                        placeholder="Password" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">
                                        <i class="zmdi zmdi-lock material-icons-name"></i>
                                    </label>
                                    <input type="password" className="custom" name="confirmPassword" id="confirmPassword" autoComplete="off"
                                        value={user.confirmPassword}
                                        onChange={handleInputs}
                                        placeholder="Confirm Password" />
                                </div>
                                <div className="form-group form-button">
                                    <input type="submit" name="signup" id="signup" className="form-submit"
                                        value="Register"
                                        onClick={handleRegistration}
                                         />
                                </div>
                            </form>
                        </div>
                        <div className="signup-image">
                            <figure>
                                <img src="images/signup.jpg" alt="registration" />
                            </figure>
                            <div className="extra-title">
                                <NavLink to="/login" className='signup-image-link'>Already have an Account </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Register;