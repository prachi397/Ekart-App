import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Register.css";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { actionOnPlaceOrder } from "../redux/ekart/EkartActionCreator";
import UserService from "../Services/UserService";
import CircularLoader from "../utility/CircularLoader";

const Address = () => {
  const navigate = useNavigate();
  const dispatchRedux = useDispatch();
  const [cartItems, setCartItems] = useState([]);
  const loginValue = useSelector((state) => state.LoginData.loggedInUser);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const { selectedProduct } = location.state || {};

    const [user, setUser] = useState({
        name: "",
        phone: "",
        address: "",
        country:"",
        pin: ""
    });

    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value });
    }
    
    useEffect(() => {
        const userEmail = loginValue.email;
        const objUserService = new UserService();
        objUserService.FetchCartProducts(userEmail)
          .then((response) => {
            if (response.status === "success") {
              const productsInCart = response.productsInCart || [];
              setCartItems(productsInCart);
            } else {
              console.error("Error fetching cart items:", response.error);
            }
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching cart items:", error);
            setIsLoading(false);
          });
      }, []);
   
    const handleOrder = async (e,inputData) => {
        e.preventDefault();
        const products= selectedProduct
        ? [
              {
                  productId: selectedProduct.productId,
                  quantity: selectedProduct.quantity || 1,
                  size: selectedProduct.size || "S",
              },
          ]
        : cartItems.map((item) => ({
              productId: item.productId,
              quantity: item.quantity || 1,
              size: item.size || "S",
          }));
        inputData = {
            userId: loginValue.email,
            products ,
            user: {
                email: loginValue.email,
                name: user.name,
                address: `${user.address}, ${user.country} ${user.pin}`,
                mobileNumber: user.phone
            }
          }; 
         setLoading (true);
        dispatchRedux(
            actionOnPlaceOrder(inputData, "Placing Order. Please Wait...")
          )
            .then(async (responseData) => {
              if (responseData.status == "success") {
                setLoading(false);
                alert('Order Placed successfully.')
                navigate('/my-orders'); 
              } else {
                alert("You have entered wrong information!")
                console.error('Oder failed:', responseData.error);
              }
            })
            .catch((error) => {
                alert("error", "Error", "Error in Placing Order");
              console.log(error);
            });
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
           message="Placing Order...."
          />
        </div>
      ) : (
        <></>
      )}
            <section className="signup">
                <div className="container mt-5">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Please Fill Your Details</h2>
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
                                {/* <div className="form-group">
                                    <label htmlFor="email">
                                        <i class="zmdi zmdi-email material-icons-name"></i>
                                    </label>
                                    <input type="email" className="custom" name="email" id="email" autoComplete="off"
                                        value={user.email}
                                        onChange={handleInputs}
                                        placeholder="Email" />
                                </div> */}
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
                                    <label htmlFor="address">
                                        <i class="zmdi zmdi-account-box-mail material-icons-name"></i>
                                    </label>
                                    <input type="text" className="custom" name="address" id="address" autoComplete="off"
                                        value={user.address}
                                        onChange={handleInputs}
                                        placeholder="Address, House No, City " />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="country">
                                        <i class="zmdi zmdi-city-alt material-icons-name"></i>
                                    </label>
                                    <input type="text" className="custom" name="country" id="country" autoComplete="off"
                                        value={user.country}
                                        onChange={handleInputs}
                                        placeholder="State, Country" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pin">
                                        <i class="zmdi zmdi-pin material-icons-name"></i>
                                    </label>
                                    <input type="number" className="custom" name="pin" id="pin" autoComplete="off"
                                        value={user.pin}
                                        onChange={handleInputs}
                                        placeholder="Pin" />
                                </div>
                                <div className="form-group form-button">
                                    <input type="submit" name="signup" id="signup" className="form-submit"
                                        value="Submit"
                                        onClick={handleOrder}
                                         />
                                </div>
                            </form>
                        </div>
                        <div className="signup-image">
                            <figure>
                                <img src="images/signup.jpg" alt="registration" />
                            </figure>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Address;