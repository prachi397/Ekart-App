import {
  API_SUCCESS,
  API_REQUEST,
  API_ERROR,
  DATE_RANGE_FLAG,
  API_REQUEST_SUCCESS,
  SET_DEPARTMENT_DATA,
  USER_LOGIN,
  SET_SEARCH_RESULTS,
  SET_CART_ITEMS,
} from "./EkartActionType";

const initialState = {
  loading: false,
  loadingMsg: "",
  buttonHandler: {
    saveBtnDisabled: true,
    resetBtnDisabled: false,
    applyFilterDisabled: false,
    dateRange: false,
  },
  searchResults: [],
  errorCode: "",
  errorMSG: "",
  successMsg: "",
  startDate: "",
  endDate: "",
  rVersion: "",

  loggedInUser: {
    name: "",
    email: "",
    number: "",
  },
  AuthToken: "",
};

const EkartReducer = (state = initialState, action) => {
  switch (action.type) {
    case API_REQUEST:
      return {
        ...state,
        loading: true,
        loadingMsg: action.payload.loadingmsg,
      };

      break;
    case API_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
      };

      break;

    case API_SUCCESS:
      console.log("API_SUCCESS payload:", action.payload);
      return {
        ...state,
        loading: false,
        errorCode: "",
        errorMSG: "",
        successMsg: action.payload.successMsg,
        // loggedInUser: action.payload.userDetails,
        // loggedInUser: {
        //   email: action.payload.userDetails.email,
        //   name: action.payload.userDetails.name,
        //   number: action.payload.userDetails.phoneNumber, 
        // },
        rVersion: action.payload.version,
      };
      break;

    case DATE_RANGE_FLAG:
      return {
        ...state,
        buttonHandler: {
          ...state.buttonHandler,
          dateRange: action.payload.filterFlag,
        },
      };
      break;

    case API_ERROR:
      return {
        ...state,
        loading: false,
        errorCode: action.payload.errorCode,
        errorMSG: action.payload.errorMSG,
      };

      break;

    case SET_SEARCH_RESULTS:
      console.log(
        "SET_SEARCH_RESULTS action dispatched with payload:",
        action.payload
      );
      return {
        ...state,
        searchResults: action.payload,
      };
      break;
    case USER_LOGIN:
      console.log("USER_LOGIN payload:", action.payload);
      return {
        ...state,
        loggedInUser: {
          email: action.payload.email,
          name: action.payload.name,
          number: action.payload.phoneNumber,
        },
      };
      case "LOGOUT":
        return {
          ...state,
          loggedInUser: {
            name: "",
            email: "",
            number: "",
          },
        };
    case SET_DEPARTMENT_DATA:
      return {
        ...state,
        loading: false,
        errorCode: "",
        errorMSG: "",
        successMsg: action.payload.successMsg,
        DepartmentList: action.payload.depttData,
        departmentName: action.payload.deptname,
        departmentObj: action.payload.deptObj,
        isDepartmentDataLoaded: action.payload.isDepartmentDataLoaded,
      };
      break;
    default:
      return state;
  }
};

export default EkartReducer;
