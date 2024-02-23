import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles/Button";
import { useDispatch, useSelector } from "react-redux";
import { actionOnAddToCart } from "../redux/ekart/EkartActionCreator";
import UserService from "../Services/UserService";
import { ToastDisplay } from "../utility/ToastDisplay";
import { Toast } from "primereact/toast";

const SingleProduct = () => {
  const toast = useRef(null);
  const navigate = useNavigate();
  const { id: productIdFromURL } = useParams();
  const loginValue = useSelector((state) => state.LoginData.loggedInUser);
  const dispatchRedux = useDispatch();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('S');


  const fetchProduct = ()=>{
    const userEmail = loginValue.email;
    const objUserService = new UserService();
    objUserService.FetchAllProducts(userEmail)
      .then((response) => {
        if (response.status === "success") {
          const product = response.products.find((p) => p.productId === productIdFromURL);
          setProduct(product);
        } else {
          console.error("Error fetching Product:", response.error);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Product:", error);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleAddToCart = (inputData) => {
    inputData = {
      userId: loginValue.email,
      productId: productIdFromURL,
      quantity: selectedQuantity,
      size: selectedSize,
    };
    dispatchRedux(
      actionOnAddToCart(inputData, "Adding Product. Please Wait...")
    )
      .then(async (responseData) => {
        if (responseData.status == "success") {
          // alert('Product Added to Your Cart successfully.')
          ToastDisplay("success", "Successful", `User Logged In Successfully.`, 200000, toast);
          fetchProduct();
        } else {
          alert("Internal server error")
          console.error('Internal server error:', responseData.error);
        }
      })
      .catch((error) => {
        alert("error", "Error", "Error in adding product");
        console.log(error);
      });
  }

  const selectedProduct = {
    productId: productIdFromURL,
    quantity: selectedQuantity,
    size: selectedSize,
  };
  const handlePlaceOrder = () => {
    navigate('/address-component', { state: { selectedProduct } });
  };

  return (
    <Wrapper>  
      <div className="container">
        <>
          <div className="product-images">
            <img src={`data:image/png;base64, ${product.image}`} alt={product.productName} />
          </div>
          <hr />
          <div className="product-data">
            <div className="product-data-info">
              <span>{product.productName}</span>
              <p>{product.description}</p>
            </div>
            <div className="product-data-price">
              <p className="product-data-real-price">Price: {product.price} Rs.</p>
            </div>
          </div>
          <div className="select-dropdown">
          <div className="quantity-dropdown">
            <select style={{
              "height": "2rem",
              "width": "4rem"
            }}
              id="quantity"
              name="quantity"
              value={product.addtocart ? product.quantity : selectedQuantity}
              onChange={(e) => setSelectedQuantity(parseInt(e.target.value))}
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
              value={product.addtocart?product.size:selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          </div>
          <div className="product-data-buttons">
            {product.addtocart ? (
              <Button onClick={() => navigate("/cart")}>Go to Cart</Button>
            ) : (
              <Button onClick={handleAddToCart}>Add to Cart</Button>
            )}
            <Button onClick={handlePlaceOrder}>Order Now</Button>
          </div>
        </>
      </div>
    </Wrapper>
  );

};
const Wrapper = styled.section`
  .container {
    padding: 9rem 0;
  }
  .product-data-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;  /* Center buttons horizontally */
    width: fit-content;
  
    .add-to-cart-button,
    .order-now-button {
      flex: 1;
    }
  }
  
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .product-data-buttons {
      flex-direction: column;
      text-align: center;  
      width:20rem;
    margin-top: 1rem;

    position: sticky;
  
      .add-to-cart-button,
      .order-now-button {
        width: 100%;
      }
    }
  }
  .product-data {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 2rem;

    .product-data-warranty {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      margin-bottom: 1rem;

      .product-warranty-data {
        text-align: center;

        .warranty-icon {
          background-color: rgba(220, 220, 220, 0.5);
          border-radius: 50%;
          width: 4rem;
          height: 4rem;
          padding: 0.6rem;
        }
        p {
          font-size: 1.4rem;
          padding-top: 0.4rem;
        }
      }
    }

    .product-data-price {
      font-weight: bold;
    }
    .product-data-real-price {
      color: ${({ theme }) => theme.colors.btn};
    }
    .product-data-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      font-size: 1.8rem;

      span {
        font-weight: bold;
      }
    }

    hr {
      max-width: 100%;
      width: 90%;
      /* height: 0.2rem; */
      border: 0.1rem solid #000;
      color: red;
    }
  }

  .product-images {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 0 2.4rem;
  }
`;
export default SingleProduct;