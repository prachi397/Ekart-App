import axios from "axios";

const API_URL = "http://localhost:4500";

class UserService {
  constructor(source) {
    this.ref = source;
  }

// api for user registration
 UserRegister(inputData) {
  return new Promise((resolve, reject) => {
    let userRegisterURL = `${API_URL}/register`;
    const body = inputData;
    axios.post(userRegisterURL, body)
      .then((response) => response.data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

//login api
UserLogin(inputData) {
  return new Promise((resolve, reject) => {
    let userLoginURL = `${API_URL}/login`;
    const body = inputData;
    axios.post(userLoginURL, body)
      .then((response) => response.data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// api to get all products
FetchAllProducts(email) {
  return new Promise((resolve, reject) => {
    let apiURL = `${API_URL}/get-products/${email}`;
    axios.get(apiURL)
      .then((response) => response.data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// api to get single product
getProductById(userId, productId) {
  return new Promise((resolve, reject) => {
    let userLoginURL = `${API_URL}/get-singleProduct/${userId}`;
    const body = { productId };
    axios.post(userLoginURL, body)
      .then((response) => response.data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// api for added product to the cart
addToCart(inputData) {
  return new Promise((resolve, reject) => {
    let userLoginURL = `${API_URL}/add-to-cart`;
    const body = inputData;
    axios.post(userLoginURL, body)
      .then((response) => response.data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// api for remove product to the cart
removeFromCart(inputData) {
  return new Promise((resolve, reject) => {
    let userLoginURL = `${API_URL}/remove-from-cart`;
    const body = inputData;
    axios.post(userLoginURL, body)
      .then((response) => response.data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

//api to get products in the cart
FetchCartProducts(email) {
  return new Promise((resolve, reject) => {
    let apiURL = `${API_URL}/get-cart/${email}`;
    axios.get(apiURL)
      .then((response) => response.data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// api to place order
placeOrder(inputData) {
  return new Promise((resolve, reject) => {
    let userLoginURL = `${API_URL}/place-order`;
    const body = inputData;
    axios.post(userLoginURL, body)
      .then((response) => response.data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// api to fetch order details
FetchOrders(email) {
  return new Promise((resolve, reject) => {
    let apiURL = `${API_URL}/orders/${email}`;
    axios.get(apiURL)
      .then((response) => response.data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
}
export default UserService;
