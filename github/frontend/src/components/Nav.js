import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FiShoppingCart } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const Nav = () => {
    const navigate = useNavigate();
  const loginValue = useSelector((state) => state.LoginData.loggedInUser);


    const Nav = styled.nav`
    .navbar-lists {
        display: flex;
        gap: 4.8rem;
        align-items: center;
    margin-right: 2rem;

        .navbar-link {
            &: link,
            &: visited {
                display: inline-block;
                text-decoration: none;
                font-size: 1.8rem;
                font-weight: 500;
                text-transform: uppercase;
                color: ${({ theme }) => theme.colors.black};
                transition: color 0.3s linear;
            }

            &: hover,
            &:active {
                color: ${({ theme }) => theme.colors.helper};
            }
        }
    }
    .mobile-navbar-btn {
        display: none;
        background-color: transport;
        cursor: pointer;
        border: none;
    }
    .mobile-nav-icon[name="close-outline"]{
        display: none;
    }
    .close-outline {
        display: none;
    }
    .user-icon{
        font-size: 3rem;
    }
    .cart-trolley--link {
        position; relative;

        .cart-trolley {
            position:relative;
            font-size: 3rem;
        }

        .cart-total--item {
            width:2.4rem;
            height:2.4rem;
            position: absolute;
            color: #000;
            border-radius: 50%;
            display: grid;
            place-items; center;
    background-color: skyblue;
    top: -33%;
    right: -.0001%;
    margin-right: 0.5rem;
    margin-top: 1rem;
        }
    }
    .user-login--name {
        text-transform : capitalize;
    }
    .user-logout,
    .user-login{
        font-size: 1.4rem;
        padding: 0.8rem 1.4rem;
    }
    @media (max-width: ${({ theme }) => theme.media.mobile}){
        .mobile-navbar-btn{
            display:inline-block;
            z-index: 9999;
            border: ${({ theme }) => theme.colors.black};

            .mobile-nav-icon {
                font-size: 4.2rem;
                color: ${({ theme }) => theme.colors.black};
            }
        }

        .active .mobile-nav-icon {
            display:none;
            font-size: 4.2rem;
            position; absolute;
            top: 30%;
            right: 10%;
            color; ${({ theme }) => theme.colors.black};
            z-index: 9999;
        }
        .active .close-outline{
            display: inline-block;
        }
        .navbar-lists {
            width: 100vw;
            height: 100vh;
            position: absolute;
            top: 0;
            left: 0;
            background-color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            visiblity: hidden;
            opacity: 0;
            transform: translateX(100%);
            transition: all 3s linear;
        }
        .active .navbar-lists {
            visibility: visible;
            opacity: 1;
            transform: translateX(0);
            z-index: 999;
            transform-origin; right;
            transition: all 3s linear;

            .navbar-link{
                font-size: 4.2rem;
            }
        }

        .user-logout,
    .user-login{
        font-size: 2.2rem;
        padding: 0.8rem 1.4rem;
    }
    }

    `;
    return (
        <Nav>
            <div className="navbar">
                <ul className="navbar-lists">
                    {loginValue.email !== '' && ( 
                        <>
                            <li>
                                <NavLink to="/home" className="navbar-link">
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/about" className="navbar-link">
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/products" className="navbar-link">
                                    Products
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact" className="navbar-link">
                                    Contact
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/cart" className="navbar-link cart-trolley--link">
                                    <FiShoppingCart className="cart-trolley" />
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/profile" className="navbar-link">
                                    <FaUserCircle className="user-icon" />
                                </NavLink>
                            </li>
                        </>
                    )}

                    {loginValue.email === '' && (
                         <>
                         <li>
                             <NavLink to="/" className="navbar-link">
                                 SignUp
                             </NavLink>
                         </li>
                         <li>
                             <NavLink to="/login" className="navbar-link">
                                 Login
                             </NavLink>
                         </li>
                     </>
                    )}
                </ul>
            </div>
        </Nav>
    );
};
export default Nav;