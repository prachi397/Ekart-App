import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserService from "../Services/UserService";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CircularLoader from "../utility/CircularLoader";

const MyOrders = () => {
    const loginValue = useSelector((state) => state.LoginData.loggedInUser);
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const userEmail = loginValue.email;
        const objUserService = new UserService();
        setLoading (true);
        objUserService.FetchOrders(userEmail)
          .then((response) => {
            if (response.status === "success") {
              setLoading (false);
              setOrders(response.orders);
            } else {
              console.error("Error fetching Orders:", response.error);
            }
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching Orders:", error);
            setIsLoading(false);
          });
      }, []);
     
     

      const handleProductClick = (productId) => {
        navigate(`/singleproduct/${productId}`);
      };

    return (
      <>
        {loading ? (
        <div
          style={{
            display: "flex",
            height: "100vh",
            width: "100%",
            position: "fixed",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999999,
            backgroundColor: "rgba(0,0,0,0.6)",
          }}
        >
          <CircularLoader
           message="Fetching Details...."
          />
        </div>
      ) : (
        <></>
      )}
        <div className="order-item">
        {orders.map((order) => (
            <div key={order._id} className="order-details">
                <div className="product-list">
                    {order.products.map((product) => (
                        <div key={product._id} className="cart-image--name">
                            <figure>
                                <img
                                    src={`data:image/png;base64, ${product.image}`}
                                    alt={product.description}
                                    onClick={() => handleProductClick(product.productId)}
                                />
                                <h3>{product.productName}</h3>
                            </figure>
                        </div>
                    ))}
                </div>
                <hr/>
                <div className="order-details">
                    <p><b>Price:</b> {order.totalPrice} Rs.</p> 
                    <p><b>Status:</b> {order.status}</p>
                </div>
                <hr/>
            </div>
        ))}
    </div>
    </>
)};
// const Wrapper = styled.section`
//   padding: 9rem 0;

//   .grid-four-column {
//     grid-template-columns: repeat(4, 1fr);
//   }

//   .grid-five-column {
//     grid-template-columns: repeat(4, 1fr) 0.3fr;
//     text-align: center;
//     align-items: center;
//   }
//   .cart-heading {
//     text-align: center;
//     text-transform: uppercase;
//   }
//   hr {
//     margin-top: 1rem;
//   }
//   .cart-item {
//     align-items: center;
//     padding: 3.2rem 0;
//     display: flex;
//     flex-direction: column;
//     gap: 3.2rem;
//   }

//   .cart-user--profile {
//     display: flex;
//     justify-content: flex-start;
//     align-items: center;
//     gap: 1.2rem;
//     margin-bottom: 5.4rem;

//     img {
//       width: 8rem;
//       height: 8rem;
//       border-radius: 50%;
//     }
//     h2 {
//       font-size: 2.4rem;
//     }
//   }
//   .cart-user--name {
//     text-transform: capitalize;
//   }
//   .cart-image--name {
//     /* background-color: red; */
//     align-items: center;
//     display: grid;
//     gap: 1rem;
//     grid-template-columns: 0.4fr 1fr;
//     text-transform: capitalize;
//     text-align: left;
//     img {
//       max-width: 15rem;
//       height: 15rem;
//       object-fit: contain;
//       color: transparent;
//     }

//     .color-div {
//       display: flex;
//       align-items: center;
//       justify-content: flex-start;
//       gap: 1rem;

//       .color-style {
//         width: 1.4rem;
//         height: 1.4rem;

//         border-radius: 50%;
//       }
//     }
//   }

//   .order-total--subdata {
//    width: 50rem;
//   }
  
//   @media (max-width: ${({ theme }) => theme.media.mobile}) {
//     .order-total--subdata {
//       width : 100%
//     }
//   }
  
//   .cart-two-button {
//     margin-top: 2rem;
//     display: flex;
//     justify-content: space-between;

//     .btn-clear {
//       background-color: #e74c3c;
//     }
//   }

//   .amount-toggle {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     gap: 2.4rem;
//     font-size: 1.4rem;

//     button {
//       border: none;
//       background-color: #fff;
//       cursor: pointer;
//     }

//     .amount-style {
//       font-size: 2.4rem;
//       color: ${({ theme }) => theme.colors.btn};
//     }
//   }

//   .remove_icon {
//     font-size: 1.6rem;
//     color: #e74c3c;
//     cursor: pointer;
//   }

//   .order-total--amount {
//     width: 100%;
//     margin: 4.8rem 0;
//     text-transform: capitalize;
//     display: flex;
//     flex-direction: column;
//     justify-content: flex-end;
//     align-items: flex-end;

//     .order-total--subdata {
//       border: 0.1rem solid #f0f0f0;
//       display: flex;
//       flex-direction: column;
//       gap: 1.8rem;
//       padding: 3.2rem;
//     }
//     div {
//       display: flex;
//       gap: 3.2rem;
//       justify-content: space-between;
//     }

//     div:last-child {
//       background-color: #fafafa;
//     }

//     div p:last-child {
//       font-weight: bold;
//       color: ${({ theme }) => theme.colors.heading};
//     }
//   }

//   @media (max-width: ${({ theme }) => theme.media.mobile}) {
//     .grid-five-column {
//       grid-template-columns: 1.5fr 1fr 0.5fr;
//     }
//     .cart-hide {
//       display: none;
//     }

//     .cart-two-button {
//       margin-top: 2rem;
//       display: flex;
//       justify-content: space-between;
//       gap: 2.2rem;
//     }

//     .order-total--amount {
//       width: 100%;
//       text-transform: capitalize;
//       justify-content: flex-start;
//       align-items: flex-start;

//       .order-total--subdata {
//         width: 100%;
//         border: 0.1rem solid #f0f0f0;
//         display: flex;
//         flex-direction: column;
//         gap: 1.8rem;
//         padding: 3.2rem;
//       }
//     }
//   }
// `;

export default MyOrders;