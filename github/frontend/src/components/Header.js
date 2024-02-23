import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Nav from "./Nav";
import SidebarPage from "./Sidebar";
import "./Header.css";

const Header = () => {
    return (
        <MainHeader>
            <NavLink to='/'>
                <h1 className="logo-design">Ekart Store</h1>
                        {/* <SidebarPage/> */}
            </NavLink>
            <Nav />
        </MainHeader>
    )
};

const MainHeader = styled.header`
height: 7rem;
background-color: ${({ theme }) => theme.colors.bg};
display: flex;
justify-content: space-between;
align-items: center;
position: relative;

`;

export default Header;