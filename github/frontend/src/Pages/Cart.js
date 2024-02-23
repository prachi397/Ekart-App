import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import UserService from "../Services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../styles/Button";
import { actionOnRemoveFromCart } from "../redux/ekart/EkartActionCreator";
import { Toast } from "primereact/toast";
import { ToastDisplay } from "../utility/ToastDisplay";
import CircularLoader from "../utility/CircularLoader";

const Cart = () => {
  const toast = useRef(null);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const loginValue = useSelector((state) => state.LoginData.loggedInUser);
  const [selectedSize, setSelectedSize] = useState('S');
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const [loading, setLoading] = useState(false);

  const dispatchRedux = useDispatch();

  const handleProductClick = (productId) => {
    navigate(`/singleproduct/${productId}`);
  };

  const getCarts = () => {
    const userEmail = loginValue.email;
    const objUserService = new UserService();
    setLoading(true);
    objUserService.FetchCartProducts(userEmail)
      .then((response) => {
        if (response.status === "success") {
          const productsInCart = response.productsInCart || [];
          setCartItems(productsInCart);
        } else {
          console.error("Error fetching cart items:", response.error);
        }
        setLoading(false);
        // setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
        setLoading(false);
        // setIsLoading(false);
      });
  }
  useEffect(() => {
    getCarts();
  }, []);

  const handleRemoveCart = (inputData, productId) => {
    inputData = {
      userId: loginValue.email,
      productId: productId,
    };
    setLoading(true);
    dispatchRedux(
      actionOnRemoveFromCart(inputData, "Removing Product. Please Wait...")
    )
      .then(async (responseData) => {
        if (responseData.status == "success") {
          // alert('Product Removed from Your Cart successfully.')
          ToastDisplay("success", "Successful", `Product Removed Successfully.`, 200000, toast);
          getCarts();
          setLoading(false);
        } else {
          ToastDisplay("error", "Error", `Error in Removing Product.`, 200000, toast);
          setLoading(false);
        }
      })
      .catch((error) => {
        ToastDisplay("error", "Error", `Error in Removing Product.`, 200000, toast);
        console.log(error);
      });
  }

  const handlePlaceOrder = () => {
    navigate('/address-component');
  };
  const calculateSubTotal = () => {
    const total = cartItems.reduce((accumulator, item) => {
      const itemPrice = parseFloat(item.price*item.quantity);
      if (!isNaN(itemPrice)) {
        return accumulator + itemPrice;
      }
      return accumulator;
    }, 0);

    return total.toFixed(2);
  };
  const calculateTotal = () => {
    const subTotal = parseFloat(calculateSubTotal());
    const shippingCost = 50.00;

    if (!isNaN(subTotal)) {
      const total = subTotal + shippingCost;
      return total.toFixed(2);
    }
    return "0.00";
  };

  return (
    <Wrapper>
       <Toast ref={toast} />
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
      <div className="cart-item">
        {cartItems.map((item) => (
          <div key={item.productId}>
            <div className="cart-image--name">
              <figure key={item.productId}>
                <img src={`data:image/png;base64, ${item.image}`} alt={item.description}
                  onClick={() => handleProductClick(item.productId)} />
                <h3>{item.productName}</h3>
              </figure>
              <div className="color-div">
                <div className="select-dropdown">
                  <div className="quantity-dropdown">
                    <select style={{
                      "height": "2rem",
                      "width": "4rem"
                    }}
                      id="quantity"
                      name="quantity"
                      value={item.addtocart ? item.quantity : selectedQuantity}
                      disabled={true}
                    >
                      {[...Array(10).keys()].map((num) => (
                        <option key={num + 1} value={num + 1}>
                          {num + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="size-dropdown">
                    <select style={{
                      "height": "2rem",
                      "width": "4rem"
                    }}
                      id="size"
                      name="size"
                      value={item.addtocart ? item.size : selectedSize}
                      disabled={true}
                    >
                      {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <span style={{ "fontSize": "1.5rem" }}><b>{item.price} Rs.</b></span>
                <Button onClick={() => handleRemoveCart(loginValue.email, item.productId)}>Remove</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {cartItems.length > 0 ? (
        <div className="order-summary">
          <div className="order-total--amount">
            <div className="order-total--subdata">
              <div>
                <span><b>Subtotal:</b></span>
                <span>{calculateSubTotal()} Rs.</span>
              </div>
              <div>
                <span><b>Shipping:</b></span>
                <span>50.00 Rs.</span>
              </div>
              <div>
                <span><b>Total:</b></span>
                <span>{calculateTotal()} Rs.</span>
              </div>
            </div>
            <div className="place-order-button">
              <Button onClick={handlePlaceOrder}>Place Order</Button>
            </div>
          </div>
        </div>
      ) : <h2> Your cart is Empty !</h2>}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 9rem 0;

  .grid-four-column {
    grid-template-columns: repeat(4, 1fr);
  }

  .grid-five-column {
    grid-template-columns: repeat(4, 1fr) 0.3fr;
    text-align: center;
    align-items: center;
  }
  .cart-heading {
    text-align: center;
    text-transform: uppercase;
  }
  hr {
    margin-top: 1rem;
  }
  .cart-item {
    align-items: center;
    padding: 3.2rem 0;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
  }

  .cart-user--profile {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1.2rem;
    margin-bottom: 5.4rem;

    img {
      width: 8rem;
      height: 8rem;
      border-radius: 50%;
    }
    h2 {
      font-size: 2.4rem;
    }
  }
  .cart-user--name {
    text-transform: capitalize;
  }
  .cart-image--name {
    /* background-color: red; */
    align-items: center;
    display: grid;
    gap: 1rem;
    grid-template-columns: 0.4fr 1fr;
    text-transform: capitalize;
    text-align: left;
    img {
      max-width: 15rem;
      height: 15rem;
      object-fit: contain;
      color: transparent;
    }

    .color-div {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 1rem;

      .color-style {
        width: 1.4rem;
        height: 1.4rem;

        border-radius: 50%;
      }
    }
  }

  .order-total--subdata {
   width: 50rem;
  }
  
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .order-total--subdata {
      width : 100%
    }
  }
  
  .cart-two-button {
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;

    .btn-clear {
      background-color: #e74c3c;
    }
  }

  .amount-toggle {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2.4rem;
    font-size: 1.4rem;

    button {
      border: none;
      background-color: #fff;
      cursor: pointer;
    }

    .amount-style {
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.btn};
    }
  }

  .remove_icon {
    font-size: 1.6rem;
    color: #e74c3c;
    cursor: pointer;
  }

  .order-total--amount {
    width: 100%;
    margin: 4.8rem 0;
    text-transform: capitalize;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;

    .order-total--subdata {
      border: 0.1rem solid #f0f0f0;
      display: flex;
      flex-direction: column;
      gap: 1.8rem;
      padding: 3.2rem;
    }
    div {
      display: flex;
      gap: 3.2rem;
      justify-content: space-between;
    }

    div:last-child {
      background-color: #fafafa;
    }

    div p:last-child {
      font-weight: bold;
      color: ${({ theme }) => theme.colors.heading};
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid-five-column {
      grid-template-columns: 1.5fr 1fr 0.5fr;
    }
    .cart-hide {
      display: none;
    }

    .cart-two-button {
      margin-top: 2rem;
      display: flex;
      justify-content: space-between;
      gap: 2.2rem;
    }

    .order-total--amount {
      width: 100%;
      text-transform: capitalize;
      justify-content: flex-start;
      align-items: flex-start;

      .order-total--subdata {
        width: 100%;
        border: 0.1rem solid #f0f0f0;
        display: flex;
        flex-direction: column;
        gap: 1.8rem;
        padding: 3.2rem;
      }
    }
  }
`;

export default Cart;