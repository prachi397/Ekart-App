import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Button } from "../styles/Button";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../Services/UserService";
import { useSelector } from "react-redux";
import { ToastDisplay } from "../utility/ToastDisplay";
import { Toast } from "primereact/toast";
import CircularLoader from "../utility/CircularLoader";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const toast = useRef(null);
  const loginValue = useSelector((state) => state.LoginData.loggedInUser);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const userEmail = loginValue.email;
    const objUserService = new UserService();
    setLoading(true);
    objUserService.FetchAllProducts(userEmail)
      .then((response) => {
        if (response.status === "success") {
          setProducts(response.products);
        } else {
          ToastDisplay("error", "Error", "Error fetching Products", 2000, toast);
        }
        setLoading(false);
        // setIsLoading(false);
      })
      .catch((error) => {
        ToastDisplay("error", "Error", "Error fetching Products", 2000, toast);
        setLoading(false);
        // setIsLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const isSearchValid = searchTerm.length >= 3;

  const handleProductClick = (productId) => {
    navigate(`/singleproduct/${productId}`, { state: { productId } });
  };


  return (
    <>
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
      <div className="search-product">
        <input type="text"
          placeholder="Search here"
          style={{ "fontSize": "1.7rem" }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" style={{
          "height": "6rem",
          "width": "5rem",
          "border": "1px solid rgba(98, 84, 243, 0.5)",
          "boxShadow": "rgba(0,0,0,0.16) 0px 1px 4px"
        }} disabled={!isSearchValid}
        ><i class="fa fa-search"></i></button>
      </div>
      <div className="all-products">
        <div className="products">
          {filteredProducts.map((product) => (
            <figure key={product._id}>
              <img
                src={`data:image/png;base64, ${product.image}`}
                alt={product.description || ''}
                onClick={() => handleProductClick(product.productId)}
              />
              <h3>{product.productName}</h3>
            </figure>
          ))}

        </div>
      </div>
    </>
  );
};


const Wrapper = styled.section`
  .grid-filter-column {
    grid-template-columns: 0.2fr 1fr;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid-filter-column {
      grid-template-columns: 1fr;
    }
  }
`;

export default Products;