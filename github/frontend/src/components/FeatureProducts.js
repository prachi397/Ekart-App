import styled from "styled-components";

import { useProductContext } from "../context/productContex";
import Products from "../Pages/Products";
import Product from "../Pages/Product";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserService from "../Services/UserService";

const FeatureProduct = () => {
  // const { isLoading, featureProducts } = useProductContext();
  const navigate = useNavigate();
  const loginValue = useSelector((state) => state.LoginData.loggedInUser);
  const [featureProducts, setFeatureProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userEmail = loginValue.email;
    const objUserService = new UserService();
    objUserService.FetchAllProducts(userEmail)
      .then((response) => {
        if (response.status === "success") {
          const products = response.products.filter((p) => p.category.includes('template'));
          setFeatureProducts(products);
        } else {
          console.error("Error fetching Products:", response.error);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Products:", error);
        setIsLoading(false);
      });
  }, [loginValue.email]);
  

  if (isLoading) {
    return <div> ......Loading </div>;
  }

  const handleProductClick = () => {
    navigate(`/products`);
  };

  return (
    <Wrapper className="section">
      <div className="container">
        <div className="intro-data">Check Now!</div>
        <div className="common-heading">Our Feature Services</div>
        <div className="grid grid-three-column">
          {featureProducts.map((product) => {
            return (
              <figure key={product._id}  onClick={handleProductClick}>
                <img src={`data:image/png;base64, ${product.image}`} alt={product.description} />
                <p className="caption">{product.description}</p>
              </figure>
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
    padding: 5rem 0;
    background-color: ${({ theme }) => theme.colors.bg};
  
    .container {
      max-width: 120rem;
    }
  
    figure {
      width: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      overflow: hidden;
      transition: all 0.5s linear;
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 0%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        transition: all 0.2s linear;
        cursor: pointer;
      }
      &:hover::after {
        width: 100%;
      }
      &:hover img {
        transform: scale(1.2);
      }
      img {
        max-width: 100%;
        width: 20rem;
        margin-top: 1.5rem;
        height: 22rem;
        transition: all 0.2s linear;
      }
  
      .caption {
        position: absolute;
        top: 70%;
        right: 10%;
        text-transform: uppercase;
        background-color: ${({ theme }) => theme.colors.bg};
        color: white;
        padding: 0.8rem 2rem;
        font-size: 1.2rem;
        border-radius: 2rem;
      }
    }
  
    .card {
      background-color: #fff;
      border-radius: 1rem;
      width: fit-content;
    padding: 1rem;
    height: 29rem;
  
      .card-data {
        padding: 0 2rem;
      }
  
      .card-data-flex {
        margin: 2rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
  
      h3 {
        color: ${({ theme }) => theme.colors.text};
        text-transform: capitalize;
      }
  
      .card-data--price {
        color: ${({ theme }) => theme.colors.helper};
      }
  
      .btn {
        margin: 2rem auto;
        background-color: rgb(0 0 0 / 0%);
        border: 0.1rem solid rgb(98 84 243);
        display: flex;
        justify-content: center;
        align-items: center;
  
        &:hover {
          background-color: rgb(98 84 243);
        }
  
        &:hover a {
          color: #fff;
        }
        a {
          color: rgb(98 84 243);
          font-size: 1.4rem;
        }
      }
    }
  `;

export default FeatureProduct;

