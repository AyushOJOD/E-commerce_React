import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/product/ProductSlice";
import authReducer from "../features/Auth/authSlice";
import cartReducer from "../features/Cart/CartSlice";
import orderReducer from "../features/orders/orderSlice";
import userReducer from "../features/User/userSlice";

export const store = configureStore({
  reducer: {
    product: productsReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,
  },
});
