import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducer/productReducer";
import { useSelector } from "react-redux";

const AppContext = createContext();
const API = "http://localhost:4500/get-products";

const initalState = {
    isLoading: false,
    isError: false,
    products: [],
    featureProducts: [],
    searchedProducts: [],
}

const AppProvider = ({children}) =>{

    const loginValue = useSelector((state) => state.LoginData.loggedInUser);

    const [state, dispatch] =useReducer(reducer, initalState);
    const getProducts = async (url) => {
        dispatch({ type: "SET_LOADING" });
        try {
            const res = await axios.get(url);
            const products = await res.data;
            dispatch({ type: "SET_API_DATA", payload: products });
        } catch (error) {
            dispatch({ type: "API_ERROR" });
        }
    };


    useEffect(()=>{
        getProducts(API/`${loginValue.email}`);
    },[]);
    

    return (
    <AppContext.Provider value={{...state}}>
        {children}
    </AppContext.Provider>
)};

//custom hooks
const useProductContext = () =>{
    return useContext(AppContext);
}

export {AppProvider,AppContext,useProductContext};