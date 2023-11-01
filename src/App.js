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
import UserProfilePage from "./pages/UserProfilePage";
import { fetchLoggedInUserAsync } from "./features/User/userSlice";
import LogOut from "./features/Auth/components/LogOut";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProtectedAdmin from "./features/Auth/components/ProtectedAdmin";
import AdminHome from "./pages/AdminHome";
import AdminProductDetailsPage from "./pages/AdminProductDetailsPage";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected children={<Home />} />,
  },
  {
    path: "/admin",
    element: <ProtectedAdmin children={<AdminHome />} />,
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
    path: "/admin/product-detail/:id",
    element: <ProtectedAdmin children={<AdminProductDetailsPage />} />,
  },
  {
    path: "/admin/product-form/edit/:id",
    element: <ProtectedAdmin children={<AdminProductFormPage />} />,
  },
  {
    path: "/admin/product-form/",
    element: <ProtectedAdmin children={<AdminProductFormPage />} />,
  },
  {
    path: "/admin/orders/",
    element: <ProtectedAdmin children={<AdminOrdersPage />} />,
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
    path: "/profile",
    element: <UserProfilePage />,
  },
  {
    path: "/logout",
    element: <LogOut />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
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
      dispatch(fetchLoggedInUserAsync(user.id));
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
