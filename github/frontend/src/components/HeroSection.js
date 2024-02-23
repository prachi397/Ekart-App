import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles/Button";

const HeroSection = ({myData}) => {
    const {name} = myData;
    return <Wrapper>
        <div className="container">
            <div className="grid grid-two-column">
                <div className="hero-section-data">
                    <p className="intro-data">Welcome to</p>
                    <h1>{name}</h1>
                    <p>Some changes look negative on the surface but you will soon realize that space is being created in your life for something new to emerge.</p>
                <NavLink>
                    <Button>shop now</Button>
                </NavLink>
                </div>
                <div className="hero-section-image">
                    <figure>
                        <img src="images/hero.jpg" alt="hero-section-photo" className="img-style"/>
                    </figure>
                </div>
            </div>
        </div>
    </Wrapper>
};

const Wrapper = styled.section`
padding: 5rem 0;
.intro-data{
    margin-bottom:0;
}
.hero-section-image {
    width: 90%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}
figure{
    position: relative;

    &::after {
        margin-top:4rem;
        content: "";
        width:60%;
        height:80%;
        background-color: rgba(81, 56,238,0.4);
        position: absolute;
        left: 50%;
        top: -5rem;
        z-index: -1;
    }
}

img {
    margin-top: 3rem;
    min-width: 25rem;
    height: 25rem;
}
.hero-section-data {
   align-self: center;
    p{
        margin: 1rem 0;
    }
    h1{
        text-transform: capitalize;
        font-weight: bold;
    }
}

@media (max-width: ${({theme})=> theme.media.mobile}){
    .grid{
        gap: 5rem;
    }
    figure :: after {
        content: "";
        width:50%;
        height: 100%;
        left: 0;
        top: 10%;
        background-color; grba(81, 56, 238, 0.4);
    }
}
`;

export default HeroSection;