import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/product/ProductSlice";
import authReducer from "../features/Auth/authSlice";
import cartReducer from "../features/Cart/CartSlice";

export const store = configureStore({
  reducer: {
    product: productsReducer,
    auth: authReducer,
    cart: cartReducer,
  },
});
