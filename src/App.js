import React, { useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import CartPage from "./pages/CartPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CheckOut from "./pages/CheckOut";
import ProductDeatilsPage from "./pages/ProductDeatilsPage";
import Protected from "./features/Auth/components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "./features/Auth/authSlice";
import { fetchItemsByUserIdAsync } from "./features/Cart/CartSlice";
import PageNotFound from "./pages/404";
import OrderSuccess from "./pages/OrderSuccess";
import UserOrdersPage from "./pages/UserOrdersPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected children={<Home />} />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/cart",
    element: <Protected children={<CartPage />} />,
  },
  {
    path: "/checkout",
    element: <Protected children={<CheckOut />} />,
  },
  {
    path: "/product-detail/:id",
    element: <Protected children={<ProductDeatilsPage />} />,
  },
  {
    path: "/order-success/:id",
    element: <OrderSuccess />,
  },
  {
    path: "/orders",
    element: <UserOrdersPage />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id));
    }
  }, [dispatch, user]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

// TODO: Make a contact page in the backend part
