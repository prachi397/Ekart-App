import UserService from "../../Services/UserService";
import {
  API_SUCCESS,
  API_REQUEST,
  API_ERROR,
  API_REQUEST_SUCCESS,
  USER_LOGIN,
  SET_CART_ITEMS,
} from "./EkartActionType";

export function APIRequest(msgLoader) {
  return {
    type: API_REQUEST,
    payload: {
      loading: true,
      loadingmsg: msgLoader,
    },
  };
}

export function APIRequestSuccess() {
  return {
    type: API_REQUEST_SUCCESS,
    loading: false,
  };
}

function APISuccess(data, user) {
  return {
    type: API_SUCCESS,

    payload: {
      loading: false,
      error: "",
      successMsg: "Logged in successfully",
      userDetails: { ...user },
      rVersion: user?.rVersion,
    },
  };
}

function APIError(errorHandle) {
  return {
    type: API_ERROR,
    payload: {
      loading: false,
      errorCode: errorHandle?.status || 500,
      errorMSG: errorHandle?.data?.result || "Something went Wrong",
      successMsg: "",
      userDetails: "",
      AuthToken: "",
    },
  };
}

export const actionOnRegister = (inputData, loadingmsg) => {
  return async (dispatch) => {
    const objUserService = new UserService();
    dispatch(APIRequest(loadingmsg));
    try {
      await objUserService.UserRegister(inputData);
      dispatch(APIRequestSuccess());
      return {
        status: "success",
      };
    } catch (error) {
      dispatch(APIError(error.response));
      throw error;
    }
  };
  
};

export const actionOnLogin = (inputData, loadingmsg) => {
  return async (dispatch) => {
    const objUserService = new UserService();
    dispatch(APIRequest(loadingmsg));
    try {
      const responseData = await objUserService.UserLogin(inputData);

      if (responseData.status === "success") {
        dispatch({
          type: USER_LOGIN,
          payload: responseData.userDetails,
        });
      }

      dispatch(APIRequestSuccess());

      return responseData;
    } catch (error) {
      dispatch(APIError(error.response));
      throw error;
    }
  };
}
export const actionOnAddToCart = (inputData, loadingmsg) => {
  return async (dispatch) => {
    const objUserService = new UserService();
    dispatch(APIRequest(loadingmsg));
    try {
      await objUserService.addToCart(inputData);
      dispatch(APIRequestSuccess());
      return {
        status: "success",
      };
    } catch (error) {
      dispatch(APIError(error.response));
      throw error;
    }
  };
  
};

export const actionOnRemoveFromCart = (inputData, loadingmsg) => {
  return async (dispatch) => {
    const objUserService = new UserService();
    dispatch(APIRequest(loadingmsg));
    try {
      await objUserService.removeFromCart(inputData);
      dispatch(APIRequestSuccess());
      return {
        status: "success",
      };
    } catch (error) {
      dispatch(APIError(error.response));
      throw error;
    }
  };
  
};
export const getSingleProduct = (userId, productId, loadingmsg) => {
  return async (dispatch) => {
    const objUserService = new UserService();
    dispatch(APIRequest(loadingmsg));
    try {
      await objUserService.getProductById(userId, productId);
      dispatch(APIRequestSuccess());
      return {
        status: "success",
      };
    } catch (error) {
      dispatch(APIError(error.response));
      throw error;
    }
  };
};

export const actionOnPlaceOrder = (inputData, loadingmsg) => {
  return async (dispatch) => {
    const objUserService = new UserService();
    dispatch(APIRequest(loadingmsg));
    try {
      await objUserService.placeOrder(inputData);
      dispatch(APIRequestSuccess());
      return {
        status: "success",
      };
    } catch (error) {
      dispatch(APIError(error.response));
      throw error;
    }
  };
  
};

export const logoutAction = () => {
  return {
    type: "LOGOUT",
  };
};
