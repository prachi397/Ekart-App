import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../redux/ekart/EkartActionCreator";
import { Button } from "../styles/Button";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginValue = useSelector((state) => state.LoginData.loggedInUser);

    const handleLogOut = () => {
            dispatch(logoutAction());
            alert("User Log out sucessfully!");
            navigate("/login");
    }
    const handleViewOrders = () =>{
        navigate("/my-orders");
    }
    return (
        <div className="profile-page">
            <FaUserCircle className="profile-icon" />
            {loginValue && (
                <div className="user-info">
                    <p>Name: {loginValue.name}</p>
                    <p>Phone Number: {loginValue.number}</p>
                    <p>Email: {loginValue.email}</p>
                    <div className="">
                <input type="submit" name="orders" id="orders" className="form-submit"
                    value="My Orders" onClick={handleViewOrders}  />
            </div>
                </div>
            )}
            <div className="">
                <input type="submit" name="signout" id="signout" className="form-submit"
                    value="Log out" onClick={handleLogOut}  />
            </div>
        </div>
    );
};

export default Profile;