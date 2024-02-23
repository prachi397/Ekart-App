const ProductReducer = (state, action) => {

  switch (action.type) {
    case "SET_LOADING":
    return {
        ...state,
        isLoading: true,
      };
    case "SET_API_DATA":
      const filteredTemplateProducts = action.payload.products
        .filter((product) => product.category.includes("template"))
        .map(({ _id, image, description }) => ({ _id, image, description }));

      return {
        ...state,
        isLoading: false,
        products: action.payload.products,
        featureProducts: filteredTemplateProducts,
      };

      case "SEARCH_PRODUCTS":
        return {
          ...state,
          searchedProducts: action.payload,
        };
     
    case "API_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    default:
      return state;
  }
};

export default ProductReducer;